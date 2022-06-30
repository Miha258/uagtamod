mp.events.add(RageEnums.EventKey.PLAYER_READY, () => {
    mp.game.vehicle.defaultEngineBehaviour = false
})

mp.events.add('playerEnterVehicle', () => { 
    mp.players.local.setConfigFlag(429, true) //PED_FLAG_STOP_ENGINE_TURNING
})

mp.events.add('playerLeaveVehicle', () => {
    mp.players.local.setConfigFlag(241,true) //PED_FLAG_DISABLE_STOPPING_VEH_ENGINE
})