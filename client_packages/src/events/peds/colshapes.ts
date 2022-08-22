import dialogPeds from "./main"


mp.events.add(RageEnums.EventKey.PLAYER_EXIT_COLSHAPE,(shape: ColshapeMp) => {
    const dialogPed = dialogPeds.find(dialogPed => shape === dialogPed.colshape)
    if (dialogPed){
        dialogPed.data.enteredColshape = false
    }
    
})

mp.events.add(RageEnums.EventKey.PLAYER_ENTER_COLSHAPE,(shape: ColshapeMp) => {
    const dialogPed = dialogPeds.find(dialogPed => shape === dialogPed.colshape)
    if (dialogPed){
        dialogPed.data.enteredColshape = true
    }
})
