import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

export const EventManager = {
    events: {},
    
    addHandler(eventName, handler) {
        if (!(eventName in this.events)) {
            this.events[eventName] = handler
        }
    },
        
    removeHandler(eventName) { 
        if (eventName in this.events) {
            delete this.events[eventName]
        }
    }
}

function trigger(eventName, ...args) {
    const handler = EventManager.events[eventName]
    handler(...args)
}

window.trigger = trigger

root.render(<App/>);

