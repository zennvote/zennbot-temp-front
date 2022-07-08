import { FC } from 'react';

import './Attendances.scoped.scss';

export const Attendances: FC = () => {
  return (
    <div className="root">
      <h1>출석체크 관리</h1>
      <div className="table">
        <ul className="header row">
          <li className="twitchId">아이디</li>
          <li className="username">닉네임</li>
          <li className="ticketPiece">조각</li>
          <li className="ticket">티켓</li>
          <li className="etc">비고</li>
        </ul>
        <ul className="row">
          <li className="twitchId">producerzenn</li>
          <li className="username">프로듀서_젠</li>
          <li className="ticketPiece">103</li>
          <li className="ticket">0</li>
          <li className="etc">[★료A★][765-하루카,리츠코,치즈루][346-쇼코,토키코,히카루,세츠나,오토하,소라,와카바,미야코,칸나,토코.하스미,요리코,노아,아야카][315-카논,하야토,모후모후엔,F-LAGS,THE코가도,Altessimo][283-키리코,나츠하,코이토] 담당 프로듀서</li>
        </ul>
      </div>
    </div>
  );
};
