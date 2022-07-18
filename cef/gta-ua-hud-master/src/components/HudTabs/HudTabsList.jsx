import React, { useState } from 'react';
import HudTabs from './HudTabs';

const HudTabsList = () => {
    const [tabs, setTabs] = useState([
        {
            name: 'Меню',
            key: 'F5',
            id: 'menu1',
        },
        {
            name: 'Інвентар',
            key: 'I',
            id: 'menu2',
        },
        {
            name: 'Войс чат',
            key: 'B',
            id: 'menu3',
        },
        {
            name: 'Взаємодія',
            key: 'E',
            id: 'menu4',
        },
        {
            name: 'Телефон',
            key: '↑',
            id: 'menu5',
        },
    ]);

    return (
    <div className="hudtab">
        {tabs.map((tabsSingle) => (
            <HudTabs hudtab={tabsSingle} key={tabsSingle.id}/>
        ))}
    </div>
    );
};

export default HudTabsList;
