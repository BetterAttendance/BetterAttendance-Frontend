'use client';

import SessionLobby from '@/components/SessionLobby';
import ClientSessionLobby from '@/components/ClientSessionLobby';
import { use, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import QuitSessionButton from '@/components/QuitSessionButton';
import { useUser } from '@/context/user.context';

export default function Page() {
  const { isHost } = useUser();

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
