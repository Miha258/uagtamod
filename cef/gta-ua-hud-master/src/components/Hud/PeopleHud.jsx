import React, {useState} from 'react';
import HudTabsList from './HudTabs/HudTabsList';
import HudNotifyList from './HudNotify/HudNotifyList';
import HudInfoList from './HudInfo/HudInfoList';
import BallanceList from './HudBallance/BallanceList';
import HudInviteList from './HudInvite/HudInviteList';
import ServerInfo from './ServerInfo/ServerInfo';

const PeopleHud = () => {
    return (
        <div className="hud">
            <HudNotifyList />
            <HudTabsList/>
            <HudInfoList/>
            <BallanceList/>
            <HudInviteList/>
            <ServerInfo/>
        </div>
    );
};

export default PeopleHud;
