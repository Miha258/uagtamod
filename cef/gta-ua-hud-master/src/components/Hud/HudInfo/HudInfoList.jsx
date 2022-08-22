import React, { useState, useEffect } from 'react';
import gpsIcon from './gps.svg';
import dataIcon from './data.svg';
import HudInfo from './HudInfo';
import microOn from './activemicro.svg';
import microOff from './notactivemicro.svg';

const HudInfoList = () => {
    // let now = new Date();
    // const [time, setTime] = useState(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

    const [time, setTime] = useState('3:46');
    const [data, setData] = useState('17 июня 2022');

    const [region, setRegion] = useState('Вайнвуд-Хиллз');
    const [street, setStreet] = useState('Элгин-авеню');

    const [info, setInfo] = useState([
        {
            icon: gpsIcon,
            title: time,
            text: data,
            id: 'hudData',
            titleClasses: 'hudinfo__content-title',
        },
        {
            icon: dataIcon,
            title: region,
            text: street,
            id: 'hudPosition',
            titleClasses: 'hudinfo__content-title blueColor',
        },
    ]);

    return (
        <div className="hudinfo">
            <div className="hudinfo__micro">
                <img src={microOn} alt="On" />
                <img src={microOff} alt="Off" />
            </div>
            {info.map((infoSingle) => (
                <HudInfo hudinfo={infoSingle} key={infoSingle.id} />
            ))}
        </div>
    );
};

export default HudInfoList;
