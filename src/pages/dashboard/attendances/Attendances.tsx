import { FC } from 'react';
import { useAttendances } from 'src/hooks/useAttendances';

import './Attendances.scoped.scss';

export const Attendances: FC = () => {
  const { attendances } = useAttendances();

  return (
    <div className="root">
      <h1>출석체크 관리</h1>
      <div className="table">
        <ul className="header row">
          <li className="twitchId">아이디</li>
          <li className="attendedAt">출석 시각</li>
          <li className="tier">티어</li>
        </ul>
        {
          attendances?.map((attendance) => (
            <ul className="row" id={`${attendance.twitchId}-${attendance.attendedAt.getTime()}`}>
              <li className="twitchId">{ attendance.twitchId }</li>
              <li className="attendedAt">{ attendance.attendedAtString }</li>
              <li className="tier">{ attendance.tier }</li>
            </ul>
          ))
        }
      </div>
    </div>
  );
};
