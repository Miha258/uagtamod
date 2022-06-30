import React, { useState } from 'react';
import HudTabs from './HudTabs';

const HudTabsList = () => {
    const [tabs, setTabs] = useState([
        {
            name: 'Inventary',
            key: 'F1',
            id: 'menu1',
        },
        {
            name: 'Menu',
            key: 'F1',
            id: 'menu2',
        },
        {
            name: 'Menu',
            key: 'F1',
            id: 'menu3',
        },
        {
            name: 'Menu',
            key: 'F1',
            id: 'menu4',
        },
        {
            name: 'Menu',
            key: 'F1',
            id: 'menu5',
        },
        {
            name: 'Menu',
            key: 'F1',
            id: 'menu6',
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
