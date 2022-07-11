import React from 'react';

const HudTabs = (props) => {
    return (
        <div className='hudtab__item'>
            <p className='hudtab__name'>{props.hudtab.name}</p>
            <div className="hudtab__key">{props.hudtab.key}</div>
        </div>
    );
};

export default HudTabs;