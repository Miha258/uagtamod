mp.events.add('playerEnterVehicle', () => { 
    mp.game.vehicle.defaultEngineBehaviour = false
    mp.players.local.setConfigFlag(429, true) //PED_FLAG_STOP_ENGINE_TURNING
})

mp.events.add('playerLeaveVehicle', () => {
    mp.game.vehicle.defaultEngineBehaviour = false
    mp.players.local.setConfigFlag(241,true) //PED_FLAG_DISABLE_STOPPING_VEH_ENGINE
})