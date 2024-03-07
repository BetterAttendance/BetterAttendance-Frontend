'use client';

import EVENTS from '@/config/events';
import { useSocket } from '@/context/socket.context';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useUser } from '@/context/user.context';

export default function StartSessionButton() {
  const { socket, sessionID } = useSocket();
  const router = useRouter();
  const { userID } = useUser();

  const handleStartButton = () => {
    if (socket) {
      if (!userID) {
        localStorage.setItem('userId', nanoid());
      }

      socket.emit(EVENTS.CLIENT.CREATE_SESSION, { host_id: userID });
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
