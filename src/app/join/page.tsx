'use client';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { IoCopy } from 'react-icons/io5';
import { useSocket } from '@/context/socket.context';
import EVENTS from '@/config/events';

export default function Join() {
  const router = useRouter();
  const [sessionCode, setSessionCode] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const { socket } = useSocket();

  const validateSessionCode = (sessionCode: string) =>
    sessionCode.match(/^[A-Za-z0-9]{5}$/i); // 5 digits alphanumeric

  const isInvalid = useMemo(() => {
    if (sessionCode === '') return true;
    if (username === '') return true;

    return validateSessionCode(sessionCode) ? false : true;
  }, [sessionCode, username]);

  const handleJoinButton = () => {
    // TODO: handleJoinButton
    // Step 1. Validate if sessionCode is on backend
    // Step 2. Look for userId and username in localStorage, if not found, generate userId and save both username and userId on localStorage
    // const localUserId = localStorage.getItem('userId');
    // const localUsername = localStorage.getItem('username');

    if (!localStorage.getItem('username')) {
      localStorage.setItem('username', 'MumboJumbo'); // We can set random username later
      console.log('username not found, using MumboJumbo as username');
    }

    // 2. Call server listener, send the generated userId, username, and sessionId to the SERVER
    if (socket && sessionCode !== '') {
      socket.emit(EVENTS.CLIENT.JOIN_SESSION, {
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username'),
        sessionId: sessionCode,
      });
    }

    // Step 3. Check if userId is a host on backend
    // Step 4. If everything is OK (sessionCode is valid, user has userId and username), then proceed joining the session.
    // Step 5. Handle all errors appropriately

    router.push(`/session/${sessionCode}`);
  };

  return (
    <>
      <Card className="p-5">
        <CardHeader>
          <Link href="/">Back</Link>
        </CardHeader>
        <CardBody className="flex items-center gap-3">
          Enter your session code
          <Input
            placeholder="e.g. Cpp24"
            value={sessionCode}
            onValueChange={setSessionCode}
          />
          Enter your name
          <Input
            placeholder="e.g. John Doe"
            value={username}
            onValueChange={setUsername}
          />
          {isInvalid ? (
            <Button isDisabled color="primary" startContent={<IoCopy />}>
              Join Session
            </Button>
          ) : (
            <Button
              color="primary"
              startContent={<IoCopy />}
              onClick={handleJoinButton}
            >
              Join Session
            </Button>
          )}
        </CardBody>
      </Card>
    </>
  );
}
