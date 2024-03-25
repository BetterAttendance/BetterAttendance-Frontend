'use client';

import { createContext, useContext, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import EVENTS from '@/config/events';
import SOCKET_CONFIG from '@/config/socket.config';
import CONFIG from '@/config/global.config';

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
    setSessionCode(sessionCode);

    if (CONFIG.DEBUG) {
      console.log('[JOIN_SESSION] Setting sessionCode: ', sessionCode);
    }
  });

  socket.on(EVENTS.SERVER.HOST_QUIT_SESSION, () => {
    setSessionCode('');

    if (CONFIG.DEBUG) {
      console.log('[HOST_QUIT_SESSION] Setting sessionCode: ', sessionCode);
    }
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
