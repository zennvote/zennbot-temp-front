import { FC } from "react";
import { Music } from "react-feather";

import { useSongs } from "src/hooks/useSongs";

import './Broadcast.scoped.scss';

export const Broadcast: FC = () => {
  const { songs } = useSongs();

  return (
    <div className="root">
      <h2>
        총 { songs.length }개의 신청곡이 신청되었어요.
      </h2>
      <ul>
        {
          songs.map((song, index) => (
            <li key={index}>
              <div className="index">
                {index === 0 ? <Music size={14} /> : index + 1}
              </div>
              <div className="body">
                <span className="title">{song.title}</span>
                <span className="requestor">{song.requestorName}</span>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
};
