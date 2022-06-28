import { RageKeys } from '../enums/keys'


//Show Cursor
mp.keys.bind(RageKeys.F2,false,() => {
    const state = mp.gui.cursor.visible
    mp.gui.cursor.show(!state,!state)
})