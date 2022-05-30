import { FC } from 'react';
import { Link } from 'react-router-dom';

import './NotFound.scss';

export const NotFound: FC = () => {
  return (
    <div className='root'>
      <h1>404 Not Found</h1>
      <p>알 수 없는 페이지입니다!</p>
      <Link to='/dashboard' className='button'>대시보드로</Link>
    </div>
  )
};