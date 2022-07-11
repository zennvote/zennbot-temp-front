import { FC, useState } from 'react';
import { Trash2 } from 'react-feather';
import { useManagers } from 'src/hooks/useManagers';

import './Managers.scoped.scss';

export const Managers: FC = () => {
  const { managers, create, remove } = useManagers();

  const [addManagerName, setAddManagerName] = useState('');
  const handleAddManager = () => {
    create(addManagerName);
    setAddManagerName('');
  };
  const handleDeleteManager = (twitchId: string) => {
    remove(twitchId);
  };

  return (
    <div className="root">
      <h1>매니저 관리</h1>

      <div className="pane add-manager">
        <h2>매니저 추가하기</h2>
        <div className="form">
          <input
            type="text" placeholder="곡 제목을 입력하세요" value={addManagerName}
            onChange={(e) => setAddManagerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddManager()}
          />
          <button onClick={handleAddManager}>추가하기</button>
        </div>
      </div>

      <div className="pane managers">
        <h2>매니저 목록</h2>
        <div className="table">
          <ul className="row header">
            <li className="index">#</li>
            <li className="twitchId">트위치 아이디</li>
            <li className="delete"></li>
          </ul>
          {
            managers?.map((manager, index) => (
              <ul id={`${manager.id}`} className="row">
                <li className="index">{ index + 1 }</li>
                <li className="twitchId">{ manager.twitchId }</li>
                <li className="delete">
                  <Trash2 className='delete-button' onClick={() => handleDeleteManager(manager.twitchId)} />
                </li>
              </ul>
            ))
          }
        </div>
      </div>
    </div>
  );
};
