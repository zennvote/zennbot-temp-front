import { Dialog } from "@headlessui/react";
import { FC, useEffect, useMemo, useState } from "react";
import { useIdols } from "src/hooks/useIdols";

import './AddBiasModal.scss';
import { Account, AccountResponse } from "src/models/Account";
import axios from "axios";
import { useAccounts } from "src/hooks/useAccounts";
import { PlusCircle, MinusCircle } from 'react-feather';

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

  const selectedIdols = useMemo(() => {
    if (!idols) {
      return idols ?? [];
    }

    return idols.filter((idol) => selected.includes(idol.id));
  }, [selected, idols])

  const handleSelectIdol = (id: string) => {
    if (selected.includes(id)) {
      select(selected.filter((finding) => finding !== id));
    } else {
      select([...selected, id]);
    }
  };

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
        <h2>담당 아이돌 추가</h2>
        <div className="desc">{username} 프로듀서의 담당 아이돌을 추가할 수 있어요.</div>

        <div className="divider"></div>

        <div className="body">
          <div className="form-body">
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
              <ul className="header account-result-row">
                <li className="index">#</li>
                <li className="name">이름</li>
                <li className="company">소속</li>
                <li className="button"></li>
              </ul>
              {
                searched && searched.map((searched) => (
                  <ul className={`account-result-row ${selected.includes(searched.id) ? 'selected' : ''}`}>
                    <li className="index">{searched.displayId}</li>
                    <li className="name">{searched.fullName}</li>
                    <li className="company">{searched.company}</li>
                    <li className="button">
                      {
                        selected.includes(searched.id) ?
                          <MinusCircle className="delete" size={20} onClick={() => handleSelectIdol(searched.id)} /> :
                          <PlusCircle size={20} onClick={() => handleSelectIdol(searched.id)} />
                      }
                    </li>
                  </ul>
                ))
              }
            </div>
          </div>
          <div className="selected-body">
            <h3>담당 아이돌 목록</h3>
            <div className="desc">{username}님의 담당 아이돌 목록이에요.</div>
            <ul className="selected-list">
              {
                selectedIdols && selectedIdols.map((idol) => (
                  <li className="selected-idol">
                    {idol.fullName}
                    <MinusCircle className="button" size={20} onClick={() => handleSelectIdol(idol.id)} />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className="buttons">
          <button onClick={() => handleClose()}>취소</button>
          <button className="primary" disabled={!isClosable} onClick={() => handleConfirm()}>확인</button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
