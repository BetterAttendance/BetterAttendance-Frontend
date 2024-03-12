'use client';

import SessionLobby from '@/components/session_lobby/SessionLobby';
import ClientSessionLobby from '@/components/session_lobby/ClientSessionLobby';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import QuitSessionButton from '@/components/session_lobby/QuitSessionButton';
import { useSocket } from '@/context/socket.context';
import { useEffect, useState } from 'react';
import EVENTS from '@/config/events';
import { useUser } from '@/context/user.context';
import { useParams } from 'next/navigation';

export default function Page() {
  const { socket } = useSocket();
  const [ isHost, setIsHost ] = useState(false);
  const { generateNewUserId, setValidationDone } = useUser();

  // Use useParams hook to get sessionCode parameters
  // Synchonize problem if we use sessionCode from useSocket
  const { sessionCode } = useParams();

  const checkIfHost = (userID: string, sessionCode: string) => {
    if (socket) {
      console.log(`Checking if user is host of session: ${sessionCode}`);
      socket.emit(EVENTS.CLIENT.CHECK_IF_HOST, { userID, sessionCode });
      socket.on(EVENTS.SERVER.CHECK_IF_HOST, (data: { isHost: boolean }) => {
        setIsHost(data.isHost);
        console.log('User is host:', data.isHost);
        setValidationDone(true);
      });
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      generateNewUserId();
    } else {
      console.log('User already has a userId.');
    }

    if (userId && sessionCode) {
      // TypeScript will complain if we don't convert sessionCode to string
      checkIfHost(userId, sessionCode.toString());

    // TODO: Add server session code validation

    }
  }, []);  

  return (
    <>
      <Card className="p-5">
        <CardHeader>
          <QuitSessionButton />
        </CardHeader>
        <CardBody className="flex items-center">
          {isHost ? <SessionLobby /> : <ClientSessionLobby />}
        </CardBody>
      </Card>
    </>
  );
}
