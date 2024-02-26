'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { useSocket } from '@/context/socket.context';
import { Card, CardBody, CardHeader, Link } from '@nextui-org/react';

export default function SessionLobby() {
  const { socket, sessionID } = useSocket();

  return (
    <>
      <Card className="p-5">
        <CardHeader>
          <Link href="/">Back</Link>
        </CardHeader>
        <CardBody className="flex items-center">
          <h1>Welcome to session room: {sessionID}</h1>
          <h2>To join the session please scan the QR code below</h2>
          <QRCodeCanvas value={`http://localhost:3000/session/${sessionID}`} />
        </CardBody>
      </Card>
    </>
  );
}
