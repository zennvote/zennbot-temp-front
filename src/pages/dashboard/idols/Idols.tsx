import { FC, useMemo, useState } from "react";
import { useIdols } from "src/hooks/useIdols";
import { Menu } from '@headlessui/react';
import { Heart, MoreHorizontal } from "react-feather";

import './Idols.scss';

export const Idols: FC = () => {
  const { idols } = useIdols();
  const [filter, setFilter] = useState('');

  const filteredIdols = useMemo(() => {
    if (!filter || !idols) {
      return idols;
    }

    return idols.filter((idol) => (
      idol.firstName?.includes(filter) ||
      idol.lastName.includes(filter) ||
      idol.company?.includes(filter)
    ));
  }, [filter, idols]);

  return (
    <div className="root">
      <h1>아이돌 목록</h1>

      <div className="search">
        <input type="text" placeholder="검색" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      {
        filteredIdols && (
          <div className="table">
            <ul className="header row">
              <li className="id">#</li>
              <li className="name">이름</li>
              <li className="company">소속</li>
              <li className="unit">유닛</li>
              <li className="type">타입</li>
              <li className="birthday">생일</li>
              <li className="age">나이</li>
              <li className="height">키</li>
              <li className="weight">체중</li>
              <li className="threeSize">3사이즈</li>
              <li className="hometown">출신지</li>
              <li className="cv">성우</li>
              <li className="menu"></li>
            </ul>
            {
              filteredIdols.map((idol) => (
                <ul className="rowgroup">
                  <ul className="row">
                    <li className="id">{ idol.displayId }</li>
                    <li className="name">{ idol.fullName }</li>
                    <li className="company">{ idol.company }</li>
                    <li className="unit">{ idol.unit }</li>
                    <li className="type">{ idol.type }</li>
                    <li className="birthday">{ idol.birthday }</li>
                    <li className="age">{ idol.age }</li>
                    <li className="height">{ idol.height }</li>
                    <li className="weight">{ idol.weight }</li>
                    <li className="threeSize">{ idol.threeSize }</li>
                    <li className="hometown">{ idol.hometown }</li>
                    <li className="cv">{ idol.cv }</li>
                    <Menu as="li" className="menu">
                      <Menu.Button className="menu-button" as="div">
                        <MoreHorizontal size={16} />
                      </Menu.Button>
                      <Menu.Items className={"menu-items"}>
                        <Menu.Item className={"menu-item"} as='div'>
                          <Heart size={20} strokeWidth={2} /> 담당 프로듀서 추가
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </ul>
                  <ul className="row">
                    <li className="id"></li>
                    <li className="introduction">{ idol.introduction }</li>
                  </ul>
                </ul>
              ))
            }
          </div>
        )
      }
    </div>
  )
};
