import React, {useState} from 'react';
import BallanceTabs from './BallanceTabs';

const BallanceList = () => {
    let yourmoney = '3.605.000';

    const [money, setMoney] = useState([
        {money: yourmoney, id: 'cash'},
        {money: yourmoney, id: 'card'},
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