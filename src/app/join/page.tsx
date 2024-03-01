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
import { useEffect, useMemo, useState } from 'react';
import { IoCopy } from 'react-icons/io5';
import { nanoid } from 'nanoid';

export default function Join() {
  const router = useRouter();
  const [sessionCode, setSessionCode] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const validateSessionCode = (sessionCode: string) =>
    sessionCode.match(/^[A-Za-z0-9]{5}$/i); // 5 digits alphanumeric

  const isInvalid = useMemo(() => {
    if (sessionCode === '') return true;
    if (username === '') return true;

    return validateSessionCode(sessionCode) ? false : true;
  }, [sessionCode, username]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    }
  }, [username]);

  const handleJoinButton = () => {
    // TODO: handleJoinButton
    // 1. Check if client has userId and username, if none, generate a new one
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', nanoid());
      console.log('userId not found, generating new userId');
    }

    // 2. Call server listener, send the generated userId, username, and sessionId to the SERVER

    // router.push(`/session/${sessionCode}`);
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
