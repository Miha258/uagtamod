import { RageKeys } from "../../enums/keys"
import { CameraService, ICameraSettings } from '../../services/camera'
import dialogPeds from './main'


mp.keys.bind(RageKeys.E,false,() => {
    const dialogPed = dialogPeds.find(dialogPed => dialogPed.data.enteredColshape)
    if (dialogPed?.data.enteredColshape){
        dialogPed.data.dialogActive = true
        const pedPosition = dialogPed.ped.position
        const boneIndex = 12844 
        const openCameraSettings: ICameraSettings = {
            render: true,
            ease: true,
            easeTime: 1000,
            p3: true,
            p4: false
        }
        CameraService.createCameraAtPedBone(
            pedPosition.x + dialogPed.cameraOffset.x, 
            pedPosition.y + dialogPed.cameraOffset.y, 
            pedPosition.z + dialogPed.cameraOffset.z,
            mp.players.local.name,
            dialogPed.ped,
            boneIndex,
            openCameraSettings
        )
        dialogPed.data.dialogBrowser = mp.browsers.new("package://cef/dialogs/starterquest/index.html")
    }
})
