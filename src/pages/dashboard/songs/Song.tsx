import { FC, useState } from "react";
import { useSongs } from "src/hooks/useSongs";

import './Song.scoped.scss';

export const Song: FC = () => {
  const { addSong, resetSongs, resetCooltimes } = useSongs();

  const [addSongTitle, setAddSongTitlte] = useState('');

  const handleAddSong = () => {
    addSong(addSongTitle);
    setAddSongTitlte('');
  };

  const handleResetSongs = () => resetSongs()
  const handleResetCooltime = () => resetCooltimes();

  return (
    <div className="root">
      <h1>신청곡 관리</h1>

      <div className="pane add-song">
        <h2>임의 신청곡 추가</h2>
        <div className="form">
          <input
            type="text" placeholder="곡 제목을 입력하세요" value={addSongTitle}
            onChange={(e) => setAddSongTitlte(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSong()}
          />
          <button onClick={handleAddSong}>추가</button>
        </div>
      </div>

      <div className="pane reset-songs">
        <h2>신청곡 초기화</h2>
        <div className="buttons">
          <button onClick={handleResetSongs}>신청곡 초기화</button>
          <button onClick={handleResetCooltime}>쿨타임 초기화</button>
        </div>
      </div>
    </div>
  )
};
