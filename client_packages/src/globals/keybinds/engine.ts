import { RageKeys } from '../../enums/keys'


mp.keys.bind(RageKeys.E,false,() => {
    const vehicle = mp.players.local.vehicle
    if (vehicle){
        const vehicleEngineState = vehicle.getIsEngineRunning()
        if (vehicleEngineState){
            vehicle.setEngineOn(false,false,true)
            mp.events.call('sendDoneAlert', 'Ви заглушили двигун')
        } else {
            vehicle.setEngineOn(true,false,true)
            mp.events.call('sendDoneAlert', 'Ви завели двигун')
            vehicle.setVariable("needStopEngine",false)
        }
    }
})
