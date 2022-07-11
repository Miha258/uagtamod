import { hud } from "./main"

mp.events.add(RageEnums.EventKey.BROWSER_DOM_READY, (browser: BrowserMp) => {
    if (browser === hud){
        setInterval(() => {
            const playerPosition = mp.players.local.position
            const playerStreet = mp.game.pathfind.getStreetNameAtCoord(playerPosition.x,playerPosition.y,playerPosition.z, 0, 0)
            const streetName = mp.game.ui.getStreetNameFromHashKey(playerStreet.streetName)
            const crossingRoad = mp.game.ui.getStreetNameFromHashKey(playerStreet.crossingRoad)
            browser.execute(`window.trigger(\'setHudRegion\', \'${translateSereetName(streetName)}\')`)
            browser.execute(`window.trigger(\'setHudStreet\', \'${translateSereetName(crossingRoad)}\')`)
        },1000)
    }
})

function translateSereetName(streetName: string){
    return streetName
    .replace('Э', 'Е')
    .replace('э', 'e')
    .replace('И', 'І')
    .replace('и', 'і')
    .replace('ы', 'и')
    .replace('Ы', 'И')
    .replace('Шоссе', 'Шосе')
    .replace('шоссе', 'шосе')
}