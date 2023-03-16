import { Dialog } from "@headlessui/react";
import { FC, useEffect, useMemo, useState } from "react";
import { useIdols } from "src/hooks/useIdols";

import './AddBiasModal.scss';
import { Account, AccountResponse } from "src/models/Account";
import axios from "axios";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useAccounts } from "src/hooks/useAccounts";

type Props = {
  username: string;
  onClose?: () => void;
};
export const AddBiasModal: FC<Props> = ({ username, onClose }) => {
  const { idols } = useIdols();
  const { mutate } = useAccounts();

  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState('');
  const [selected, select] = useState<string[]>([]);
  const [isClosable, setIsClosable] = useState(true);

  useEffect(() => {
    axios.get<AccountResponse>(`/viewers/${username}`)
    .then((response) => new Account(response.data))
    .then((account) => select(account.biasIdolIds));
  }, [username]);

  const searched = useMemo(() => {
    if (!idols) {
      return idols ?? [];
    }

    return idols.filter((idol) => (
      idol.fullName?.includes(filter) ||
      idol.company?.includes(filter)
    ));
  }, [filter, idols]);

  const handleSelectIdol = (id: string) => {
    if (selected.includes(id)) {
      select(selected.filter((finding) => finding !== id));
    } else {
      select([...selected, id]);
    }
  }

  const handleConfirm = async () => {
    if (!isClosable) return;
    setIsClosable(false);

    await axios.post(`/viewers/${username}/bias-idols`, { ids: selected });
    await mutate();

    setIsClosable(true);
    handleClose();
  };

  if (!idols) return (<div />);

  const handleClose = () => {
    if (!isClosable) return;

    setIsOpen(false);
    onClose?.()
  }

  return (
    <Dialog className="dialog" open={isOpen} onClose={handleClose}>
      <Dialog.Panel className="dialog-panel">
        <h3>담당 아이돌 추가</h3>
        <div className="desc">{username} 프로듀서의 담당 아이돌을 추가할 수 있어요.</div>

        <div className="account-search">
          <input
            type="text"
            placeholder="검색"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className={`account-result ${searched.length === 0 ? 'no-result' : ''}`}>
          {filter && searched.length === 0 && (
            <div className="no-result">검색 결과가 없습니다!</div>
          )}
          {
            searched && searched.map((searched) => (
              <div className={`account-result-item ${selected.includes(searched.id) ? 'selected' : ''}`}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={selected.includes(searched.id)} onChange={() => handleSelectIdol(searched.id)} />
                    }
                    label={searched.fullName}
                  />
              </div>
            ))
          }
        </div>

        <div className="buttons">
          <button disabled={!isClosable} onClick={() => handleConfirm()}>확인</button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
