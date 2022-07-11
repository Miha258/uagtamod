import dialogPeds from "./main"
import { CameraService, ICameraSettings } from '../../services/camera'


mp.events.addProc("reciveStarterDialog",() => {
    const dialogPed = dialogPeds.find(dialogPed => dialogPed.data.dialogActive && dialogPed.data.dialogBrowser)
    return dialogPed?.dialogText.join('  ')
})

mp.events.addProc("reciveStarterButtons",() => {
    const dialogPed = dialogPeds.find(dialogPed => dialogPed.data.dialogActive && dialogPed.data.dialogBrowser)
    dialogPed?.dialogButtons?.forEach(button => {
        mp.events.add("buttonCallback:"+button.name,button.callback)
    })
    const dialogButtons = dialogPed?.dialogButtons?.filter(button => button.name)
    return dialogButtons?.join(' ')
})

mp.events.add("closeStarterDialog",() => {
    const dialogPed = dialogPeds.find(dialogPed => dialogPed.data.dialogActive && dialogPed.data.dialogBrowser)
    if (dialogPed){
        dialogPed.data.dialogBrowser?.destroy()
        const removeCameraSettings: ICameraSettings = {
            render: false,
            ease: true,
            easeTime: 1000,
            p3: true,
            p4: false
        }
        CameraService.removeCamera(removeCameraSettings)
        dialogPed.data.dialogActive = false
        dialogPed.data.enteredColshape = false
    }
})