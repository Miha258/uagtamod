export let rentVehicleInfo: string
let vehicleRentMenue: BrowserMp

mp.events.add("activateVehicleRentMenue",(activate: boolean, text: string, vehicleName: string) => {
    if (activate){
        mp.gui.cursor.show(true,true)
        rentVehicleInfo = text
        vehicleRentMenue = mp.browsers.new("package://cef/rentvehicles/index.html")
    } else {
        mp.game.ui.setNotificationTextEntry(`Ви орендували: ~g~${vehicleName}`)
        mp.gui.cursor.show(false,false)
        vehicleRentMenue.destroy()
    }
})
