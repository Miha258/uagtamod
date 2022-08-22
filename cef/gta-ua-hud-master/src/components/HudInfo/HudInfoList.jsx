import React from 'react';
import gpsIcon from './gps.svg';
import dataIcon from './data.svg';
import HudInfo from './HudInfo';
import microOn from './activemicro.svg';
import microOff from './notactivemicro.svg';
import { EventManager } from '../../index'


class HudInfoList extends React.Component {
    constructor(props){
        super(props)
        this.time = `00:00`
        this.date = `00.0000`
        this.region = ''
        this.street = ''
        this.microEnabled = false
        this.state = {
            info: [
                {
                    icon: dataIcon,
                    title: this.time,
                    text: this.date,
                    id: 'hudPosition',
                    titleClasses: 'hudinfo__content-title',
                },
                {
                    icon: gpsIcon,
                    title: this.region,
                    text: this.street,
                    id: 'hudData',
                    titleClasses: 'hudinfo__content-title blueColor',
                },
            ]
        }
        
    }

    componentDidMount(){
        //Zones
        EventManager.addHandler("setHudRegion",region => {
            this.region = region
        })
        EventManager.addHandler("setHudStreet",street => {
            this.street = street
        })

        //Microphone
        EventManager.addHandler("setHudMicrophoneState",toggle => {
            this.microEnabled = toggle
        })
        //Date
        this.setTimeAndDate = setInterval(() => {
            this.now = new Date()
            const mounth = this.now.getMonth() < 10 ? '0' + this.now.getMonth() : this.now.getMonth()
            const day = this.now.getDay() < 10 ? '0' + this.now.getDay() : this.now.getDay()
            const hours = this.now.getHours() < 10 ? '0' + this.now.getHours() : this.now.getHours()
            const minutes = this.now.getMinutes() < 10 ? '0' + this.now.getMinutes() : this.now.getMinutes()
            
            this.time = `${hours}:${minutes}`
            this.date = `${day}.${mounth}.${this.now.getFullYear()}`
            this.setState({
                info: [{
                    icon: dataIcon,
                    title: this.time,
                    text: this.date,
                    id: 'hudData',
                    titleClasses: 'hudinfo__content-title',
                },
                {
                    icon: gpsIcon,
                    title: this.region,
                    text: this.street,
                    id: 'hudPosition',
                    titleClasses: 'hudinfo__content-title blueColor',
                }]
            })
        }, 1000)
    }

    componentWillUnmount(){
        EventManager.removeHandler("setHudRegion")
        EventManager.removeHandler("setHudStreet")
        EventManager.removeHandler("setHudMicrophone")
        clearInterval(this.setTimeAndDate)
    }

    render(){
        return (
            <div className="hudinfo">
                <div className="hudinfo__micro">
                    {this.microEnabled ? <img src={microOn} alt="On"/> : <img src={microOff} alt="Off" />}
                </div>
                {this.state.info.map((infoSingle) => (
                    <HudInfo hudinfo={infoSingle} key={infoSingle.id} />
                ))}
            </div>
        );
    }
};

export default HudInfoList;
