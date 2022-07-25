import React from 'react';

const BallanceTabs = (props) => {
    return (
        <div className="hudballance__item">
            <p className="hudballance__money">{props.ballance.money} <span>$</span></p>
        </div>
    );
};

export default BallanceTabs;
