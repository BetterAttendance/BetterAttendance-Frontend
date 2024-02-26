import React from 'react'
import { Button } from '@nextui-org/react';
import { useUser } from '@/context/user.context';
import { useSocket } from '@/context/socket.context';
import { useRouter } from 'next/navigation';

export default function ClientSessionLobby() {
    const { username, handleSubmitUsername } = useUser();
    const { socket, sessionID } = useSocket();
    const router = useRouter();

    const handleReturnToHome = () => {
        socket?.disconnect();
        router.push('/');
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>Welcome to session room: {sessionID}</h1> 
            
            {username === '' ? (
                <form onSubmit={handleSubmitUsername} className='flex flex-col justify-center'>
                    <label>Please enter your name to join:</label>
                    <input type="text" name="username"/>
                    <br />

                    <Button type="submit" color="primary" variant="solid">
                        Submit
                    </Button>
                </form>
            ) : ( 
                <>
                    <h2>Please wait until the host start the quiz</h2>
                    <br />
                
                    <Button color="primary" variant="solid" onClick={handleReturnToHome}>
                        Return
                    </Button>
                </>
            )}
        </main>
    )
}
