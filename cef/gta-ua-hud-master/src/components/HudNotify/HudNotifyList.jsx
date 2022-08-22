import React from 'react';
import HudNotify from './HudNotify';
import error from './error.svg';
import achtung from './achtung.svg';
import message from './message.svg';
import done from './done.svg';
import { EventManager } from '../../index'


class HudNotifyList extends React.Component {
    events = {}
    
    constructor(props){
        super(props)
        this.state = {
            notify: []
        }
    }

    componentDidMount(){ 
        EventManager.addHandler("sendInfoAlert",text => {
            this.state.notify.unshift({
                icon: message,
                title: 'Оповіщeння',
                text: text,
                id: this.state.notify.length,
                classes: 'hudnotify__item whiteLine',
            })
            this.setState({
                notify: this.state.notify
            })
            setTimeout(() => {
                this.state.notify.pop()
                this.setState({ notify: this.state.notify })
            }, 3000)
        })  
        EventManager.addHandler("sendDoneAlert",text => {
            this.state.notify.unshift({
                icon: done,
                title: 'Успішно',
                text: text,
                id: this.state.notify.length,
                classes: 'hudnotify__item greenLine',
            })
            this.setState({
                notify: this.state.notify
            })
            setTimeout(() => {
                this.state.notify.pop()
                this.setState({ notify: this.state.notify })
            }, 3000)
        })
        EventManager.addHandler("sendWarningAlert",text => {
            this.state.notify.unshift({
                icon: achtung,
                title: 'Увага!',
                text: text,
                id: this.state.notify.length,
                classes: 'hudnotify__item yellowLine',
            })
            this.setState({
                notify: this.state.notify
            })
            setTimeout(() => {
                this.state.notify.pop()
                this.setState({ notify: this.state.notify })
            }, 3000)
        })
        
        EventManager.addHandler("sendErrorAlert",text => {
            this.state.notify.unshift({
                icon: error,
                title: 'Помилка',
                text: text,
                id: this.state.notify.length,
                classes: 'hudnotify__item redLine',
            })
            this.setState({
                notify: this.state.notify
            })
            setTimeout(() => {
                this.state.notify.pop()
                this.setState({ notify: this.state.notify })
            }, 3000)
        })
    }


    componentWillUnmount(){
        EventManager.removeHandler("sendDoneAlert")
        EventManager.removeHandler("sendDoneAlert")
        EventManager.removeHandler("sendDoneAlert")
        EventManager.removeHandler("sendDoneAlert")
    }

    render() {
        return (
            <div className="hudnotify">
                {this.state.notify.map(notifySingle => (
                    <HudNotify notify={notifySingle} key={notifySingle.id}/>
                ))}
            </div>
        )
    }
}

export default HudNotifyList;



