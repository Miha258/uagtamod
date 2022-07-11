import React, { useState } from 'react';
import HudInvite from './HudInvite';
import person1 from './person1.png';
import person2 from './person2.png';

const HudInviteList = () => {
    const [invite, setInvite] = useState([
        // {
        //     title: 'Приглашение во фракцию',
        //     text: 'Гражданин[559] приглашает вас в Мексиканская Мафия',
        //     person1: person1,
        //     person2: person2,
        //     id: 'invite',
        // },
    ])

    return (
        <div className="hudinvite">
            {invite.map((invite) => (
                <HudInvite invite={invite} key={invite.id} />
            ))}
        </div>
    );
};

export default HudInviteList;
