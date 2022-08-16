async function spawnBox(position: Vector3Mp) {
    const obj = mp.objects.new(mp.game.joaat("prop_boxpile_06b"), position, {
        rotation: new mp.Vector3(0, 0, 0)
    })
    obj.setPhysicsParams(50, 20, 1, 1, 1, 1, 0, 1.0, 1.0, 1.0, 40)
    obj.setActivatePhysicsAsSoonAsItIsUnfrozen(true)
    await mp.game.waitAsync(500)
    obj.freezePosition(false)
    await mp.game.waitAsync(500)
    obj.applyForceTo(1, 1, 1, 1, 0, 0, 1, 0, false, true, true, true, true)
}


mp.events.add("startForklifterJob", async () => {
    spawnBox(new mp.Vector3(-395.04663, -2678.0674, 6.00022))
})