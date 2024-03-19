'use client';

import SessionLobby from '@/components/session_lobby/HostSessionLobby';
import ClientSessionLobby from '@/components/session_lobby/ClientSessionLobby';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import QuitSessionButton from '@/components/session_lobby/QuitSessionButton';
import { useSocket } from '@/context/socket.context';
import { useEffect, useState } from 'react';
import EVENTS from '@/config/events';
import { useUser } from '@/context/user.context';
import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  const { socket } = useSocket();
  const [isHost, setIsHost] = useState(false);
  const { generateNewUserId, setValidationDone } = useUser();
  const router = useRouter();

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
  };

  const isCodeValid = (sessionCode: string) => {
    return new Promise((resolve, reject) => {
      if (socket) {
        socket.emit(EVENTS.CLIENT.VALIDATE_SESSION, { sessionCode });
        socket.on(
          EVENTS.SERVER.VALIDATE_SESSION,
          (data: { isValid: boolean }) => {
            resolve(data.isValid);
          }
        );
      } else {
        reject(new Error('Socket connection is not available'));
      }
    });
  };

  // This will run for the first time and when the user refresh the page
  // In case the user refresh the page, we need to check if the user is host again
  useEffect(() => {
    // We use async function to be able to use await to wait for the response from the server
    // If we don't use async, the code will continue to run without waiting for the response
    const checkSessionValidity = async () => {
      // We only want to run the code if the socket is available
      try {
        const isValid = await isCodeValid(sessionCode.toString());
        if (isValid) {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            generateNewUserId();
          } else {
            console.log('User already has a userId.');
          }

          if (userId && sessionCode) {
            // TypeScript will complain if we don't convert sessionCode to string
            checkIfHost(userId, sessionCode.toString());
          } else {
            window.alert(
              'User ID or session code not found. Redirecting to join page.'
            );
            router.push('/join');
          }
        } else {
          console.error('Session code is invalid.');
          window.alert('Session code is invalid. Redirecting to join page.');
          router.push('/join');
        }
      } catch (error) {
        console.error('Error validating session code:', error);
        window.alert(
          'An error occurred while validating the session code. Redirecting to join page.'
        );
        router.push('/join');
      }
    };

    if (sessionCode) {
      checkSessionValidity();
    }

    // We need to clean up the event listener when the component is unmounted
    // Otherwise, the event listener will be added multiple times
    return () => {
      if (socket) {
        socket.off(EVENTS.SERVER.VALIDATE_SESSION);
        socket.off(EVENTS.SERVER.CHECK_IF_HOST);
      }
    };
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
