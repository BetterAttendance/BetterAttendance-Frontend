'use client';

import EVENTS from '@/app/config/events';
import { useSocket } from '@/context/socket.context';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StartSessionButton() {
  const { socket, sessionID } = useSocket();
  const router = useRouter();

  const handleStartButton = () => {
    if (socket) {
      socket.emit(EVENTS.CLIENT.CREATE_SESSION, { host_id: socket.id });
    }
  };

  useEffect(() => {
    if (sessionID) {
      router.push(`/session/${sessionID}`);
    }
  }, [router, sessionID]);

  return (
    <>
      <Button color="primary" variant="solid" onClick={handleStartButton}>
        Start BetterAttendance Now
      </Button>
    </>
  );
}
