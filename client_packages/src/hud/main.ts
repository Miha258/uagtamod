export let hud: BrowserMp

mp.events.add(RageEnums.EventKey.PLAYER_READY, () => {
    hud = mp.browsers.new('package://cef/gta-ua-hud-master/build/index.html')
})
