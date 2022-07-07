import { FC } from 'react';
import { useSongs } from 'src/hooks/useSongs';

import './CooltimeSongsList.scoped.scss';

export const CooltimeSongsList: FC = () => {
  const { cooltimeSongs } = useSongs();

  return (
    <div className="root">
      <div className="table">
        <ul className="header row">
          <li className='index'>#</li>
          <li className='title'>곡 제목</li>
          <li className='requestor'>신청자</li>
        </ul>
        {
          cooltimeSongs.map((song, index) => (
            <ul id={`${index}`} className="row">
              <li className='index'>{ index + 1 }</li>
              <li className='title'>{ song.title }</li>
              <li className='requestor'>{ song.requestor }</li>
            </ul>
          ))
        }
      </div>
    </div>
  )
};
