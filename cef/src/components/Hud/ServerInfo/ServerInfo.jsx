import React, { useState } from 'react';

const ServerInfo = () => {
    const [usersNow, setUsersNow] = useState(1024);
    const [id, setid] = useState(24);

    return (
        <div className="hud__serverinfo">
            <p className="hud__serverinfo-id"><span>ID:</span> {id}</p>
            <p className="hud__serverinfo-online">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="rgba(47, 128, 237, 1)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
                        stroke="rgba(47, 128, 237, 1)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                {usersNow}
            </p>
        </div>
    );
};

export default ServerInfo;
