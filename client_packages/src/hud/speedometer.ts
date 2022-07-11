import { hud } from './main'


let vehiclMaxSpeed: number

mp.events.add('playerEnterVehicle', (vehicle: VehicleMp) => {
    vehiclMaxSpeed = mp.game.vehicle.getVehicleModelMaxSpeed(vehicle.getModel())
    hud.execute(`window.trigger(\'setHudSpeedometerActive\', true)`)
})

mp.events.add('playerLeaveVehicle', () => {
    hud.execute(`window.trigger(\'setHudSpeedometerActive\', false)`)
})

mp.events.add(RageEnums.EventKey.RENDER, () => {
    const vehicle = mp.players.local.vehicle
    if (vehicle){
        hud.execute(`window.trigger(\'setHudFuel\', ${100}, ${100})`)
        hud.execute(`window.trigger(\'setHudSpeed\', ${vehicle.getSpeed() * 2.236936}, ${vehiclMaxSpeed * 2.25})`)
    }
})