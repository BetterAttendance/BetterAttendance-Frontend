"use client";

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useSocket } from '@/context/socket.context';

export default function SessionLobby() {
    const { socket, sessionID } = useSocket();

    return (
        <div>
            <main className="flex min-h-screen flex-col items-center p-24">
                <h1>Welcome to session room: {sessionID}</h1>
                <h2>To join the session please scan the QR code below</h2>
          
                <QRCodeCanvas value={`http://localhost:3000/session/${sessionID}`} />

            </main>
        </div>
    );
}
