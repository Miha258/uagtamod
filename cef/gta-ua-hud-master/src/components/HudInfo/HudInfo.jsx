import React from 'react';

const HudInfo = (props) => {
    return (
        <div className="hudinfo__item">
            <img src={props.hudinfo.icon} alt="img" />
            <div className="hudinfo__content">
                <h3 className={props.hudinfo.titleClasses}>{props.hudinfo.title}</h3>
                <p className="hudinfo__content-text">{props.hudinfo.text}</p>
            </div>
        </div>
    );
};

export default HudInfo;
