import React from 'react';

import { FiMusic, FiUser, FiAlertCircle, FiChevronsRight } from 'react-icons/fi'

import './Dashboard.scss';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="leftbar">
                <FiMusic className="leftbar-menu active" size="18" />
                <FiMusic className="leftbar-menu" size="18" />
                <FiMusic className="leftbar-menu" size="18" />
            </div>
            <div className="body">

            </div>
            <div className="rightbar">
                <ul className="iconbar">
                    <li>
                        <FiAlertCircle size="18" />
                    </li>
                    <li>
                        <FiUser size="18" />
                    </li>
                </ul>

                <div className="music_list-header">
                    <h3>Musics</h3>
                    <span className="btn">
                        다음 곡
                        <FiChevronsRight />
                    </span>
                </div>
                <ul className="music_list">
                    { [1,2,3,4].map((item, index) => (
                        <li>
                            <p className="title">
                                { index === 0 && <FiMusic /> }
                                테스트용 곡명입니다.
                            </p>
                            <p className="subtitle">시프트</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
