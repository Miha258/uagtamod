import { RageKeys } from '../../enums/keys'

//show/diable cursor

mp.keys.bind(RageKeys.KEY2,false,() => {
    const state = mp.gui.cursor.visible
    mp.events.call("showCursor", !state)
})

