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
import toast, { Toaster } from 'react-hot-toast';
import { useSocket } from '@/context/socket.context';
import { useSearchParams } from 'next/navigation';

export default function JoinSessionContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState<string>('');
  const [sessionCodeInput, setSessionCodeInput] = useState<string>('');
  const { setSessionCode } = useSocket();

  useEffect(() => {
    if ((searchParams.get('session') as string) !== '') {
      setSessionCodeInput(searchParams.get('session') as string);
    }
  }, [searchParams]);

  const validateSessionCode = (sessionCode: string) => {
    if (sessionCode === null) {
      sessionCode = '';
    }

    return sessionCode.match(/^[A-Za-z0-9]{5}$/i); // 5 digits alphanumeric
  };

  const isInvalid = useMemo(() => {
    if (sessionCodeInput === '') return true;
    if (username === '') return true;

    return validateSessionCode(sessionCodeInput) ? false : true;
  }, [sessionCodeInput, username]);

  const handleJoinButton = () => {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', nanoid());
    }

    if (!localStorage.getItem('username')) {
      toast('Please enter your name before you continue');
      return;
    }

    setSessionCode(sessionCodeInput);

    router.push(`/session/${sessionCodeInput}`);
  };

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  return (
    <>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '1px solid red',
            color: 'red',
          },
        }}
      />
      <Card className="p-5">
        <CardHeader>
          <Link href="/">Back</Link>
        </CardHeader>
        <CardBody className="flex items-center gap-3">
          Enter your session code
          <Input
            placeholder="e.g. Cpp24"
            value={sessionCodeInput}
            onValueChange={setSessionCodeInput}
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
