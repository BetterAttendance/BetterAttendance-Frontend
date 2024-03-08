'use client';

import SessionLobby from '@/components/session_lobby/SessionLobby';
import ClientSessionLobby from '@/components/session_lobby/ClientSessionLobby';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import QuitSessionButton from '@/components/session_lobby/QuitSessionButton';
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
