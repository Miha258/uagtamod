import React from 'react';

const HudNotify = (props) => {
    return (
        <div className={props.notify.classes} >
            <img src={props.notify.icon} alt="img" />
            <div className="hudnotify__content">
                <p className="hudnotify__content-title">{props.notify.title}</p>
                <p className="hudnotify__content-text">{props.notify.text}</p>
            </div>
        </div>
    );
};

export default HudNotify;

// props.notify.lineColor;