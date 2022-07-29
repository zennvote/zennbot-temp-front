import { FC, useState } from 'react';
import { ChevronsLeft, ChevronsRight } from 'react-feather';

import './Attendances.scoped.scss';
import { AttendanceList } from './components/AttendanceList';

const getBaseDay = () => {
  const now = new Date();
  return new Date(now.setDate(now.getDate() - now.getDay()));
} 

export const Attendances: FC = () => {
  const [baseDay, setBaseDay] = useState(getBaseDay());
  const dates = new Array(7).fill(null).map((n, index) => new Date(new Date(baseDay).setDate(baseDay.getDate() + index)));

  const moveWeek = (isNext: boolean) => {
    const acc = isNext ? 7 : -7;
    setBaseDay(new Date(new Date(baseDay).setDate(baseDay.getDate() + acc)));
  }

  const resetWeek = () => setBaseDay(getBaseDay());

  return (
    <div className="root">
      <h1>출석체크 관리</h1>
      <div className="topbar">
        <h2>{ baseDay.getFullYear() }년 { baseDay.getMonth() + 1 }월</h2>
        <div className="navigator">
          <ChevronsLeft size={28} onClick={() => moveWeek(false)} />
          <button onClick={resetWeek}>오늘</button>
          <ChevronsRight size={28} onClick={() => moveWeek(true)} />
        </div>
      </div>
      <ul className="dates">
        {
          dates.map((date) => (
            <AttendanceList broadcastDate={date} />
          ))
        }
      </ul>
    </div>
  );
};
