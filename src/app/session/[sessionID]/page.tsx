'use client';

import SessionLobby from '@/components/SessionLobby';
import ClientSessionLobby from '@/components/ClientSessionLobby';
import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import QuitSessionButton from '@/components/QuitSessionButton';

export default function Page() {
  const [isHost, setIsHost] = useState(true);

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
