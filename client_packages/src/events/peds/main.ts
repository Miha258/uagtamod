import { ICameraOffset } from "../../services/camera"

interface IPedDialogServiceData {
    enteredColshape: boolean,
    dialogActive: boolean,
    dialogBrowser: BrowserMp | undefined
}


export class PedDialogService {
    public ped!: PedMp
    public colshape!: ColshapeMp 
    public data: IPedDialogServiceData = {
        enteredColshape: false,
        dialogActive: false,
        dialogBrowser: undefined
    }
    constructor (private pedHash: number,private name: string,private coords: Vector3Mp,private heading: number,private dimention: number | undefined,public dialogText: string[],private animDict: string | undefined ,private animName: string | undefined,private scenario: string | undefined, public cameraOffset: ICameraOffset){
        
    } 
    async init() {
        this.ped = mp.peds.new(
            this.pedHash,
            this.coords,
            this.heading,
            this.dimention
        )
        mp.labels.new(this.name,new mp.Vector3(this.coords.x, this.coords.y, this.coords.z + 1.2),{
            dimension: this.dimention,
            los: true,
            font: 0,
            drawDistance: 10,
            color: [255,255,255,190]
        })
        this.colshape = mp.colshapes.newSphere(this.coords.x,this.coords.y,this.coords.z,1,this.dimention)
        
         
        await mp.game.waitAsync(300)
        if (this.animDict && this.animName && !this.scenario){
            mp.game.streaming.requestAnimDict(this.animDict)
            this.ped.taskPlayAnim(this.animDict,this.animName, 8.0, 1.0, -1, 1, 1.0, true, true, true)
        } else if (!this.animDict && !this.animDict && this.scenario) {
            this.ped.taskStartScenarioInPlace(this.scenario, 0, false)
        }
    } 
}
const dialogPeds = [
    new PedDialogService(RageEnums.Hashes.Ped.U_M_M_BIKEHIRE_01,
        'Джеймс',
        new mp.Vector3(-1022.4559,-2732.7908,13.756645),
        90.0,
        0,
        [
            'Привіт,я Джеймс,бачу ти новенький в штаті.Я можу тобі допомгти піднятися на ноги,бачу в тобі є якийсь потенціал',
            'Можеш зїздити на {ім`я роботи},кажуть там можна нормально підзаробити',
            'Тут,через дорогу,є мій знайомий,орендодавець.Можливо у нього щось є для тебе',
            'Подальші інструкції вислю тобі на телефон,щасливо!'
        ],
        undefined,
        undefined,
        "WORLD_HUMAN_AA_SMOKE",
        {x: -0.6,y: 0,z: 0.75}
    ),
    new PedDialogService(
        RageEnums.Hashes.Ped.U_M_Y_BAYGOR,
        'Орендодавець',
        new mp.Vector3(-1020.7212, -2694.0864, 13.989157),
        -150.0,
        0,
        [
            'Я так розумію тобі потрібен скутер.Ціна: 200$',
        ],
        undefined,
        undefined,
        "WORLD_HUMAN_AA_COFFEE",
        {x: 0.4,y: -0.6,z: 0.75}
    )
]

export default dialogPeds

mp.events.add(RageEnums.EventKey.PLAYER_READY,() => {
    for (let dialogPed of dialogPeds){
        dialogPed.init()
    }
})