import dialogPeds from "./main"


mp.events.add(RageEnums.EventKey.RENDER,() => {   
    const dialogPed = dialogPeds.find(dialogPed => dialogPed.data.enteredColshape && !dialogPed.data.dialogActive)
    if (dialogPed){ 
        mp.game.graphics.drawText("Нажмiть E для дiалoгу",[0.5, 0.7],{
            font: 0,
            color: [255, 255, 255, 185], 
            scale: [0.5, 0.5], 
            outline: true
        })
        mp.game.graphics.drawRect(0.4876, 0.719, 0.015, 0.028, 0, 0, 0, 180)                                                             
    }
})


