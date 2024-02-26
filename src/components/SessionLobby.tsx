"use client";

import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useSocket } from '@/context/socket.context';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';

export default function SessionLobby() {
    const { socket, sessionID } = useSocket();
    const [ username, setUsername ] = useState('');
    const router = useRouter();

    const handleReturnToHome = () => {
        socket?.disconnect();
        router.push('/');
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>Welcome to session room: {sessionID}</h1>
            <h2>To join the session please scan the QR code below</h2>
            
            <br />
        
            <QRCodeCanvas 
                value={`http://localhost:3000/session/${sessionID}`} 
                id="qrCode"
                size={300}
            />

            <br />

            <Button color="primary" variant="solid" onClick={handleReturnToHome}>
                Return
            </Button>
        </main>
    );
}
