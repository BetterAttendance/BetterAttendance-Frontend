'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { useSocket } from '@/context/socket.context';
import { Button } from '@nextui-org/react';

export default function SessionLobby() {
  const { socket, sessionCode } = useSocket();

  const handleStartQuiz = () => {
    // ToDo: Emit event to start the quiz
  };

  return (
    <>
      <h1>Welcome to session room: {sessionCode}</h1>
      <h2 className="pb-5">
        To join the session please scan the QR code below
      </h2>
      <QRCodeCanvas
        value={`http://localhost:3000/session/${sessionCode}`}
        size={300}
        className="pb-5"
      />
      <Button
        type="submit"
        color="primary"
        variant="solid"
        onClick={handleStartQuiz}
      >
        Start Quiz
      </Button>
    </>
  );
}
