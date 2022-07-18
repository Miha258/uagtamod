import React, {useState} from 'react';
import HudTabsList from './HudTabs/HudTabsList';
import HudNotifyList from './HudNotify/HudNotifyList';
import HudInfoList from './HudInfo/HudInfoList';
import BallanceList from './HudBallance/BallanceList';
import HudInviteList from './HudInvite/HudInviteList';

const PeopleHud = () => {
    return (
        <div className="hud">
            <HudNotifyList />
            <HudTabsList/>
            <HudInfoList/>
            <BallanceList/>
            <HudInviteList/>
        </div>
    );
};

export default PeopleHud;
