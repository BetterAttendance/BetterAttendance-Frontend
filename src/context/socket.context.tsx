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
  usersConnected: Number;
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
  usersConnected: 0,
});

const SocketsProvider = (props: any) => {
  const [sessionCode, setSessionCode] = useState<string>('');
  const [usersConnected, setUsersConnected] = useState<Number>(0);

  socket.on(EVENTS.SERVER.JOIN_SESSION, ({ sessionCode }) => {
    setSessionCode(sessionCode);

    if (CONFIG.DEBUG) {
      console.log(
        '[JOIN_SESSION] Client has joined sessionCode: ',
        sessionCode
      );
    }
  });

  socket.on(EVENTS.SERVER.HOST_QUIT_SESSION, () => {
    setSessionCode('');

    if (CONFIG.DEBUG) {
      console.log('[HOST_QUIT_SESSION] Setting sessionCode: ', sessionCode);
    }
  });

  socket.on(EVENTS.UPDATE_USERS, ({ usersConnected }) => {
    setUsersConnected(usersConnected);
  });

  socket.on(EVENTS.DISCONNECT_USERS, () => {
    // TODO
  });

  return (
    <SocketContext.Provider
      value={{ socket, sessionCode, setSessionCode, usersConnected }}
      {...props}
    />
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider;
