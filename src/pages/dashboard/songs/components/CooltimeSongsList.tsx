import { FC, useState } from 'react';

import './CooltimeSongsList.scoped.scss';

export const CooltimeSongsList: FC = () => {
  return (
    <div className="root">
      <div className="table">
        <ul className="header row">
          <li className='index'>#</li>
          <li className='title'>곡 제목</li>
          <li className='requestor'>신청자</li>
        </ul>
        <ul className="row">
          <li className='index'>1</li>
          <li className='title'>눈동자 속의 시리우스</li>
          <li className='requestor'>시프트</li>
        </ul>
        <ul className="row">
          <li className='index'>2</li>
          <li className='title'>랜덤</li>
          <li className='requestor'>시프트</li>
        </ul>
        <ul className="row">
          <li className='index'>3</li>
          <li className='title'>래래랜덤</li>
          <li className='requestor'>스택스는거꾸로해도에임킹</li>
        </ul>
      </div>
    </div>
  )
};
