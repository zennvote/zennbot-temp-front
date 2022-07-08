import { FC } from 'react';

import './Attendances.scoped.scss';

export const Attendances: FC = () => {
  return (
    <div className="root">
      <h1>출석체크 관리</h1>
      <div className="table">
        <ul className="header row">
          <li className="twitchId">아이디</li>
          <li className="attendedAt">출석 시각</li>
          <li className="tier">티어</li>
        </ul>
        <ul className="row">
          <li className="twitchId">producerzenn</li>
          <li className="attendedAt">2022-07-07 15:44:58</li>
          <li className="tier">3</li>
        </ul>
      </div>
    </div>
  );
};
