import { FC, useMemo, useState } from "react";
import { useAccounts } from "src/hooks/useAccounts";

import './Accounts.scoped.scss';

export const Accounts: FC = () => {
  const { accounts } = useAccounts();
  const [filter, setFilter] = useState('');

  const filteredAccount = useMemo(() => {
    if (!filter || !accounts) {
      return accounts;
    }

    return accounts.filter((account) => account.twitchId.includes(filter) || account.username.includes(filter));
  }, [filter, accounts]);

  return (
    <div className="root">
      <h1>시청자 포인트 관리</h1>

      <div className="search">
        <input type="text" placeholder="검색" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

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
                </ul>
              ))
            }
          </div>
        )
      }
    </div>
  )
};
