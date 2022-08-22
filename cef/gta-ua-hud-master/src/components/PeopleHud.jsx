import React, { useState } from 'react'
import HudTabsList from './HudTabs/HudTabsList'
import HudNotifyList from './HudNotify/HudNotifyList'
import HudInfoList from './HudInfo/HudInfoList'
import BallanceList from './HudBallance/BallanceList'
import HudInviteList from './HudInvite/HudInviteList'
import HudChat from './HudChat/HudChat'
import HudModal from './HudModal/HudModal';

const PeopleHud = () => {
  return (
    <div className="hud">
      <HudNotifyList />
      <HudTabsList />
      <HudInfoList />
      <BallanceList />
      <HudInviteList />
      <HudChat />
      <HudModal/>
    </div>
  )
}

export default PeopleHud
