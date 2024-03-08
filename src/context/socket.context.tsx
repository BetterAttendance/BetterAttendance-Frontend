'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import EVENTS from '@/config/events';
import SOCKET_CONFIG from '@/config/socket.config';

interface Context {
  socket: Socket | null;
  sessionID?: string;
}

const SocketContext = createContext<Context>({
  socket: null,
});

const SocketsProvider = (props: any) => {
  const [sessionID, setSessionID] = useState<string>('');
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
    socket.on(EVENTS.SERVER.JOIN_SESSION, ({ sessionID }) => {
      console.log('Setting sessionID: ', sessionID);
      setSessionID(sessionID);
    });

    socket.on(EVENTS.SERVER.LEAVE_SESSION, () => {
      console.log('Setting sessionID: ', sessionID);
      setSessionID('');
    });
  }

  return <SocketContext.Provider value={{ socket, sessionID }} {...props} />;
};

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider;
