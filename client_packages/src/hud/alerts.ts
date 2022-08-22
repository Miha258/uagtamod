import { hud } from './main'


mp.events.add('sendInfoAlert', (info: string) => {
    hud.execute(`window.trigger('sendInfoAlert', '${info}')`)
})

mp.events.add('sendDoneAlert', (done: string) => {
    hud.execute(`window.trigger('sendDoneAlert', '${done}')`)
})

mp.events.add('sendWarningAlert', (waring: string) => {
    hud.execute(`window.trigger('sendWarningAlert', '${waring}')`)
})

mp.events.add('sendErrorAlert', (error: string) => {
    hud.execute(`window.trigger('sendErrorAlert', '${error}')`)
})
