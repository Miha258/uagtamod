import dialogPeds from "./main"
import { CameraService, ICameraSettings } from '../../services/camera'


mp.events.addProc("reciveStarterDialog",() => {
    const dialogPed = dialogPeds.find(dialogPed => dialogPed.data.dialogActive && dialogPed.data.dialogBrowser)
    if (dialogPed){
        let dialog = dialogPed?.dialogTextGenerator
        let dialogText = dialog?.next()
        if (dialogText.done){
            dialogPed.dialogTextGenerator = dialogPed.generateDialogText()
            dialog = dialogPed.dialogTextGenerator
            dialogText = dialog?.next()
        }
        return dialogText?.value?.join('  ')
    }
})

mp.events.addProc("reciveStarterButtons",() => {
    const dialogPed = dialogPeds.find(dialogPed => dialogPed.data.dialogActive && dialogPed.data.dialogBrowser)
    if (dialogPed){
        let dialog = dialogPed.dialogButtonsGenerator
        let dialogButtons = dialog.next()
        if (dialogButtons.done){
            dialogPed.dialogButtonsGenerator = dialogPed.generateDialogButtons()
            dialog = dialogPed.dialogButtonsGenerator
            dialogButtons = dialog?.next()
        }
        const buttons = dialogButtons.value?.map(button => button.name)
        return buttons?.join('  ')
    }
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