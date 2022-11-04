import { FC, useMemo, useState } from "react";
import { PlusCircle } from "react-feather";
import { useAccounts } from "src/hooks/useAccounts";

import './Accounts.scoped.scss';
import { AddBiasModal } from "./components/AddBiasModal";

export const Accounts: FC = () => {
  const { accounts } = useAccounts();
  const [filter, setFilter] = useState('');

  const [addBiasModalUsername, setAddBiasModalUsername] = useState<string>();

  const filteredAccount = useMemo(() => {
    if (!filter || !accounts) {
      return accounts;
    }

    return accounts.filter((account) => account.twitchId.includes(filter) || account.username.includes(filter));
  }, [filter, accounts]);

  const handleClickButton = (username: string) => {
    setAddBiasModalUsername(username);
  };

  return (
    <div className="root">
      <h1>시청자 포인트 관리</h1>

      <div className="search">
        <input type="text" placeholder="검색" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      
      { addBiasModalUsername && <AddBiasModal username={addBiasModalUsername} onClose={() => setAddBiasModalUsername(undefined)} /> }

      {
        filteredAccount && (
          <div className="table">
            <ul className="header row">
              <li className="index">#</li>
              <li className="twitchId">아이디</li>
              <li className="username">닉네임</li>
              <li className="ticketPiece">조각</li>
              <li className="ticket">티켓</li>
              <li className="prefix">칭호</li>
              <li className="button"></li>
            </ul>
            {
              filteredAccount.map((account) => (
                <ul className="row">
                  <li className="index">{ account.index }</li>
                  <li className="twitchId">{ account.twitchId }</li>
                  <li className="username">{ account.username }</li>
                  <li className="ticketPiece">{ account.ticketPiece }</li>
                  <li className="ticket">{ account.ticket }</li>
                  <li className="prefix">{ account.prefix }</li>
                  <li className="button">
                    <PlusCircle size={20} onClick={() => handleClickButton(account.username)} />
                  </li>
                </ul>
              ))
            }
          </div>
        )
      }
    </div>
  )
};
