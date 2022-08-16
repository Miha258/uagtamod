import { ICameraOffset } from "../../services/camera"

interface IPedData {
    enteredColshape: boolean,
    dialogActive: boolean,
    dialogBrowser: BrowserMp | undefined
}

interface IDialogPedButton {
    name: string,
    callback: () => void
}

export interface IPedDialog {
    text: string[],
    buttons?: IDialogPedButton[]
}


class Ped {
    public ped!: PedMp
    
    constructor (protected pedHash: number,protected name: string,protected coords: Vector3Mp,protected heading: number,protected dimention: number | undefined,protected animDict: string | undefined ,protected animName: string | undefined,protected scenario: string | undefined){ }
        
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

        await mp.game.waitAsync(300)
        if (this.animDict && this.animName && !this.scenario){
            mp.game.streaming.requestAnimDict(this.animDict)
            this.ped.taskPlayAnim(this.animDict,this.animName, 8.0, 1.0, -1, 1, 1.0, true, true, true)
        } else if (!this.animDict && !this.animDict && this.scenario) {
            this.ped.taskStartScenarioInPlace(this.scenario, 0, false)
        }
    } 
}

class DialogPed extends Ped {
    public colshape!: ColshapeMp 
    public data: IPedData = {
        enteredColshape: false,
        dialogActive: false,
        dialogBrowser: undefined
    }
    public dialogTextGenerator
    public dialogButtonsGenerator

    constructor(protected pedHash: number, protected name: string, protected coords: Vector3Mp, protected heading: number, protected dimention: number | undefined, protected animDict: string | undefined, protected animName: string | undefined, protected scenario: string | undefined, public cameraOffset: ICameraOffset, public dialogs: IPedDialog[]) {
        super(pedHash , name, coords, heading, dimention,  animDict, animName, scenario)
        this.dialogTextGenerator = this.generateDialogText()
        this.dialogButtonsGenerator = this.generateDialogButtons()
    }

    *generateDialogText() {
        if (this.dialogs){
            for (let dialog of this.dialogs){
                yield dialog.text
            }
        }
    }

    *generateDialogButtons() {
        if (this.dialogs){
            for (let dialog of this.dialogs){
                yield dialog.buttons
            }
        }
    }

    override async init() {
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
        this.dialogs.forEach(dialog => dialog.buttons?.forEach(button => mp.events.add("buttonCallback:"+button.name,button.callback)))
    }
}


const dialogPeds = [
    new DialogPed(RageEnums.Hashes.Ped.U_M_M_BIKEHIRE_01,
        'Джеймс',
        new mp.Vector3(-1022.4559,-2732.7908,13.756645),
        90.0,
        0,
        undefined,
        undefined,
        "WORLD_HUMAN_AA_SMOKE",
        {x: -0.6,y: 0,z: 0.75},
        [
            {
                text: [
                    'Привіт,я Джеймс,бачу ти новенький в штаті.Я можу тобі допомгти піднятися на ноги,бачу в тобі є якийсь потенціал',
                    'Можеш зїздити на {ім`я роботи},кажуть там можна нормально підзаробити',
                    'Тут,через дорогу,є мій знайомий,орендодавець.Можливо у нього щось є для тебе',
                    'Подальші інструкції вислю тобі на телефон,щасливо!'
                ],
                buttons: [{
                    name: 'Згода',
                    callback() {
                        mp.gui.chat.push('test')
                    },
                }]
            }
        ]
    ),
    new DialogPed(
        RageEnums.Hashes.Ped.U_M_Y_BAYGOR,
        'Орендодавець',
        new mp.Vector3(-1020.7212, -2694.0864, 13.989157),
        -150.0,
        0,
        undefined,
        undefined,
        "WORLD_HUMAN_AA_COFFEE",
        {x: 0.4,y: -0.6,z: 0.75},
        [   {
                text: [
                    'Я так розумію тобі потрібен скутер.Ціна: 200$.Час оренди: 10 хвилин',
                ]
            }
        ],
    ),
    new DialogPed(
        RageEnums.Hashes.Ped.S_M_Y_GARBAGE,
        'Брюс',
        new mp.Vector3(-411.75104, -2701.4, 6.000216),
        -35,
        0,
        undefined,
        undefined,
        "WORLD_HUMAN_AA_SMOKE",
        {x: 0.31,y: 0.36,z: 0.75},
        [
            {
                text: [
                    'Test'
                ],
                buttons: [
                    {
                        name: 'Почати роботу',
                        callback() {
                            mp.events.callRemote('StartJob')
                        }
                    }
                ],
            },
            {
                text: [
                    'Test2'
                ],
                buttons: [
                    {
                        name: 'Завершити роботу'    ,
                        callback() {
                            mp.events.callRemote('EndJob')
                        }
                    }
                ],
            }
        ]
    )
]

export default dialogPeds

mp.events.add(RageEnums.EventKey.PLAYER_READY,async () => {
    for (let dialogPed of dialogPeds){
        await dialogPed.init() 
    }
})