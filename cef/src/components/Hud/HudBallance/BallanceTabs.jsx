import React from 'react';

const BallanceTabs = (props) => {
    return (
        <div className="hudballance__item">
            <p className="hudballance__money">{props.ballance.money} <span>$</span></p>
            <span className="hudballance__line"></span>
            <img src={props.ballance.icon} alt="money" />
        </div>
    );
};

export default BallanceTabs;