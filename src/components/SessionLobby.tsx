'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { useSocket } from '@/context/socket.context';
import { Card, CardBody, CardHeader, Link, Button } from '@nextui-org/react';

export default function SessionLobby() {
  const { socket, sessionID } = useSocket();

  const handleStartQuiz = () => {
    // ToDo: Emit event to start the quiz
  }

  return (
    <>
      <Card className="p-5">
        <CardHeader>
          <Link href="/">Back</Link>
        </CardHeader>
        <CardBody className="flex items-center">
          <h1>Welcome to session room: {sessionID}</h1>
          <h2 className='pb-5'>To join the session please scan the QR code below</h2>
          <QRCodeCanvas 
            value={`http://localhost:3000/session/${sessionID}`}
            size={300} 
            className='pb-5'/>
            <Button type="submit" color="primary" variant="solid" 
              onClick={handleStartQuiz}>
                Start Quiz
            </Button>
        </CardBody>
      </Card>
    </>
  );
}
