import { RageKeys } from '../enums/keys'
import { hud } from './main'


mp.events.add('setHudMicrophoneState', (toggle: boolean) => {
    hud.execute(`window.trigger('setHudMicrophoneState', ${toggle})`)
})


mp.events.add(RageEnums.EventKey.RENDER, () => {
    if (mp.keys.isDown(RageKeys.B)){
        mp.events.call('setHudMicrophoneState', true)
    } else {
        mp.events.call('setHudMicrophoneState', false)
    }
})
