import React, {useState} from 'react';
import BallanceTabs from './BallanceTabs';
import cashIcon from './cash.svg';
import cardIcon from './card.svg';

const BallanceList = () => {
    let yourmoney = '3.605.000';

    const [money, setMoney] = useState([
        {money: yourmoney, icon: cashIcon, id: 'cash'},
        {money: yourmoney, icon: cardIcon, id: 'card'},
    ])

    return (
        <div className="hudballance">
            {money.map((ballanceSingle) => (
                <BallanceTabs ballance={ballanceSingle} key={ballanceSingle.id}/>
            ))}
        </div>
    );
};

export default BallanceList;