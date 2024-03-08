'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import EVENTS from '@/config/events';
import SOCKET_CONFIG from '@/config/socket.config';

interface Context {
  socket: Socket | null;
  sessionCode?: string;
}

const SocketContext = createContext<Context>({
  socket: null,
});

const SocketsProvider = (props: any) => {
  const [sessionCode, setsessionCode] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const clientSocket = io(SOCKET_CONFIG.SOCKET_URL, {
      reconnection: true,
      upgrade: true,
      transports: ['websocket', 'polling'],
    });
    console.log('test');

    setSocket(clientSocket);

    return () => {
      clientSocket.disconnect();
    };
  }, []);

  if (socket) {
    socket.on(EVENTS.SERVER.JOIN_SESSION, ({ sessionCode }) => {
      console.log('Setting sessionCode: ', sessionCode);
      setsessionCode(sessionCode);
    });

    socket.on(EVENTS.SERVER.LEAVE_SESSION, () => {
      console.log('Setting sessionCode: ', sessionCode);
      setsessionCode('');
    });
  }

  return <SocketContext.Provider value={{ socket, sessionCode }} {...props} />;
};

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider;
