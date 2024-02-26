"use client";

import React from 'react';
import SessionLobby from '@/components/SessionLobby';
import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import ClientSessionLobby from '@/components/ClientSessionLobby';

export default function Page() {
    const [isHost, setIsHost] = useState(false);

    return (
        <>
            { isHost ? ( 
                <SessionLobby />
            ) : (
                <ClientSessionLobby />
            )}
        </>
    );
}
