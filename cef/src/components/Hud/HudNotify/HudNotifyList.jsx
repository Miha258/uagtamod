import React, { useState } from 'react';
import HudNotify from './HudNotify';
import error from './error.svg';
import achtung from './achtung.svg';
import message from './message.svg';
import done from './done.svg';

const HudNotifyList = () => {
    const [notify, setNotify] = useState([
        {
            icon: message,
            title: 'Уведомление',
            text: 'Нажмите “NuM” чтобы завести машину',
            id: 'message',
            classes: 'hudnotify__item whiteLine',
        },
        {
            icon: done,
            title: 'Успешно',
            text: 'Вы перевели деньги',
            id: 'done',
            classes: 'hudnotify__item greenLine',
        },
        {
            icon: achtung,
            title: 'Внимание',
            text: 'Сервер будет перезагружен через 5 минут',
            id: 'achtung',
            classes: 'hudnotify__item yellowLine',
        },
        {
            icon: error,
            title: 'Ошибка',
            text: 'У вас недостаточно прав',
            id: 'error',
            classes: 'hudnotify__item redLine',
        },
    ]);

    return (
        <div className="hudnotify">
            {notify.map((notifySingle) => (
                <HudNotify notify={notifySingle} key={notifySingle.id}/>
            ))}
        </div>
    );
};

export default HudNotifyList;
