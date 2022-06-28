export interface ICameraSettings {
    render: boolean
    ease: boolean, 
    easeTime: number, 
    p3: boolean,
    p4: false
}

export interface ICameraOffset {
    x: number
    y: number, 
    z: number, 
}

export class CameraService {
    static createCamera(x: number,y: number,z: number,camName: string,cameraSettings: ICameraSettings): CameraMp {
        const camera = mp.cameras.new(camName,new mp.Vector3(0,0,0))
        camera.setActive(true)
        camera.pointAtCoord(x,y,z)
        camera.setCoord(x,y,z)
        mp.game.cam.renderScriptCams(cameraSettings.render,cameraSettings.ease,cameraSettings.easeTime,cameraSettings.p3,true)
        return camera 
    }
    static createCameraAtPedBone(x: number,y: number,z: number,camName: string,ped: PedMp,boneIndex: number,cameraSettings: ICameraSettings): CameraMp {
        const camera = mp.cameras.new(camName,new mp.Vector3(0,0,0))
        camera.setActive(true)
        camera.pointAtPedBone(ped.handle,boneIndex,0,-90,0,true)
        camera.setCoord(x,y,z) //pedPosition.x - 0.6, pedPosition.y, pedPosition.z+0.75
        mp.game.cam.renderScriptCams(cameraSettings.render,cameraSettings.ease,cameraSettings.easeTime,cameraSettings.p3,cameraSettings.p4) //true, true,1000,true, false
        return camera 
    }
    static removeCamera(cameraSettings: ICameraSettings){
        mp.game.cam.renderScriptCams(cameraSettings.render,cameraSettings.ease,cameraSettings.easeTime,cameraSettings.p3,cameraSettings.p4)
    }
}

