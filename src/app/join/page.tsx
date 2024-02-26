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

export default function Join() {
  const router = useRouter();
  const [sessionCode, setSessionCode] = useState<string>('');

  const validateSessionCode = (sessionCode: string) =>
    sessionCode.match(/^[A-Za-z0-9]{5}$/i);

  const isInvalid = useMemo(() => {
    if (sessionCode === '') return true;

    return validateSessionCode(sessionCode) ? false : true;
  }, [sessionCode]);

  const handleJoinButton = () => {
    // TODO: Validate session code from backend
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
            placeholder="#####"
            value={sessionCode}
            onValueChange={setSessionCode}
            isInvalid={isInvalid}
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
