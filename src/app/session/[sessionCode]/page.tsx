'use client';

import HostSessionLobby from '@/components/session_lobby/HostSessionLobby';
import ClientSessionLobby from '@/components/session_lobby/ClientSessionLobby';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import HostQuitSessionButton from '@/components/session_lobby/HostQuitSessionButton';
import { useSocket } from '@/context/socket.context';
import { useEffect, useState } from 'react';
import EVENTS from '@/config/events';
import { useUser } from '@/context/user.context';
import { useParams, useRouter } from 'next/navigation';
import ClientQuitSessionButton from '@/components/session_lobby/ClientQuitSessionButton';
import CONFIG from '@/config/global.config';

export default function Page() {
  const { socket } = useSocket();
  const [isHost, setIsHost] = useState(false);
  const { setValidationDone } = useUser();
  const router = useRouter();

  // Use useParams hook to get sessionCode parameters
  // Synchonize problem if we use sessionCode from useSocket
  const { sessionCode } = useParams();

  const checkIfHost = (userID: string, sessionCode: string) => {
    if (!socket) {
      return;
    }

    if (CONFIG.DEBUG) {
      console.log(
        `[checkIfHost] Checking if user is host of session: ${sessionCode}`
      );
    }

    socket.emit(EVENTS.CLIENT.CHECK_IF_HOST, { userID, sessionCode });
    socket.on(EVENTS.SERVER.CHECK_IF_HOST, (data: { isHost: boolean }) => {
      setIsHost(data.isHost);
      setValidationDone(true);

      if (CONFIG.DEBUG) {
        console.log('[S_CHECK_IF_HOST] User is host:', data.isHost);
      }
    });
  };

  const isCodeValid = (sessionCode: string) => {
    return new Promise((resolve, reject) => {
      if (!socket) {
        reject(new Error('Socket connection is not available'));
      }

      if (CONFIG.DEBUG) {
        console.log(`[isCodeValid] Checking session is valid: ${sessionCode}`);
      }

      socket.emit(EVENTS.CLIENT.VALIDATE_SESSION, { sessionCode });
      socket.on(
        EVENTS.SERVER.VALIDATE_SESSION,
        (data: { isValid: boolean }) => {
          resolve(data.isValid);
        }
      );
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

        if (!isValid) {
          window.alert('Session code is invalid. Redirecting to join page.');
          router.push('/join');
          return;
        }

        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');

        if (userId) {
          checkIfHost(userId, sessionCode.toString());
        }

        if (!isHost && username) {
          socket.emit(EVENTS.CLIENT.JOIN_SESSION, {
            userId: userId,
            sessionCode: sessionCode.toString(),
            username: username,
          });
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
      if (!socket) {
        return;
      }

      socket.off(EVENTS.SERVER.VALIDATE_SESSION);
      socket.off(EVENTS.SERVER.CHECK_IF_HOST);
    };
  }, []);

  return (
    <>
      <Card className="p-5">
        <CardHeader>
          {isHost ? <HostQuitSessionButton /> : <ClientQuitSessionButton />}
        </CardHeader>
        <CardBody className="flex items-center">
          {isHost ? <HostSessionLobby /> : <ClientSessionLobby />}
        </CardBody>
      </Card>
    </>
  );
}
