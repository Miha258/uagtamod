import React, {useState} from 'react';
import HudTabsList from './HudTabs/HudTabsList';
import HudNotifyList from './HudNotify/HudNotifyList';
import HudInfoList from './HudInfo/HudInfoList';
import BallanceList from './HudBallance/BallanceList';
import HudInviteList from './HudInvite/HudInviteList';

const PeopleHud = () => {

    // const [time, setTime] = useState(0);
    // let date = '24.06';
    // let yourMoney = 900;

    // function timeSet() {
    //     setTimeout(() => {
    //         setTime(time + 1);
    //     }, 1000);
    // }
    // timeSet();


    // function microChange () {
    //     document.querySelector('.hud__info-micro').classList.toggle('active');
    // } 
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
