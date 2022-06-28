import { rentVehicleInfo } from './events'


mp.events.addProc("reciveRentMenueText",() => {
    return rentVehicleInfo
})  

mp.events.add("playerClickedRentButton",(isAccepted) => {
    const vehicle = mp.players.local.vehicle
    mp.events.callRemote("playerClickedRentButton",isAccepted,vehicle)
})