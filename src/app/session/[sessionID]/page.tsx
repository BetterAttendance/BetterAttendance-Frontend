"use client";

import SessionLobby from '@/components/SessionLobby';
import ClientSessionLobby from '@/components/ClientSessionLobby';
import { useState } from 'react';

export default function Page() {
  const [isHost, setIsHost] = useState(true);

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
