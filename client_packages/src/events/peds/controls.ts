import dialogPeds from "./main"


mp.events.add(RageEnums.EventKey.RENDER, () => {
    const dialogPed = dialogPeds.find(dialogPed => dialogPed.data.dialogActive)
    if (dialogPed){
        mp.game.controls.disableAllControlActions(0) 
    }
})
