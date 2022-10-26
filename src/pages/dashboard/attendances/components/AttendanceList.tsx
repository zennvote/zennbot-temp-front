import { FC, useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useAttendancesForBroadcast } from 'src/hooks/useAttendancesForBroadcast';

import './AttendanceList.scoped.scss';

const parseDate = (date: Date) => {
  const year = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  month = month >= 10 ? month : '0' + month;
  let day: string | number = date.getDate();
  day = day >= 10 ? day : '0' + day;

  return `${year}-${month}-${day}`;
};

const dayList = ['일', '월', '화', '수', '목', '금', '토'];

type AttendanceListProps = { broadcastDate: Date }
export const AttendanceList: FC<AttendanceListProps> = ({ broadcastDate }) => {
  const { attendances } = useAttendancesForBroadcast(parseDate(broadcastDate));
  const [isCollapsed, setCollapsed] = useState(false);

  useEffect(() => setCollapsed(false), [broadcastDate])

  const handleClickHeader = () => {
    setCollapsed(!isCollapsed);
  }

  return (
    <li className="root">
      <div className="header" onClick={handleClickHeader}>
        <h3 className="title">{ parseDate(broadcastDate) } ({ dayList[broadcastDate.getDay()] })</h3>
        <ChevronDown />
      </div>
      {
        isCollapsed && (
          attendances?.length  ? 
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
          </div> :
          <div className="empty">
            출석이 없습니다!
          </div>
        )
      }
    </li>
  );
};
