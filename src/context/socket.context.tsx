'use client';

import { createContext, useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import EVENTS from '@/config/events';
import SOCKET_CONFIG from '@/config/socket.config';

interface Context {
  socket: Socket;
  sessionCode: string;
  setSessionCode: (sessionCode: string) => void; // Exported function
}

const socket = io(SOCKET_CONFIG.SOCKET_URL, {
  reconnection: true,
  upgrade: true,
  transports: ['websocket', 'polling'],
});

const SocketContext = createContext<Context>({
  socket,
  sessionCode: '',
  setSessionCode: () => {},
});

const SocketsProvider = (props: any) => {
  const [sessionCode, setSessionCode] = useState<string>('');

  socket.on(EVENTS.SERVER.JOIN_SESSION, ({ sessionCode }) => {
    console.log('Setting sessionCode: ', sessionCode);
    setSessionCode(sessionCode);
  });

  socket.on(EVENTS.SERVER.LEAVE_SESSION, () => {
    console.log('Setting sessionCode: ', sessionCode);
    setSessionCode('');
  });

  return (
    <SocketContext.Provider
      value={{ socket, sessionCode, setSessionCode }}
      {...props}
    />
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider;
