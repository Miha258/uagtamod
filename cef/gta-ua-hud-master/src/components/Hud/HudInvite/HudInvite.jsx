import React from 'react';

const HudInvite = (props) => {
    return (
        <div className="hudinvite__item">
            <h1 className="hudinvite__title">{props.invite.title}</h1>
            <p className="hudinvite__text">{props.invite.text}</p>
            <img src={props.invite.person1} alt="person1" className="hudinvite__person-one"/>
            <img src={props.invite.person2} alt="person2" className="hudinvite__person-two"/>
        </div>
    );
};

export default HudInvite;