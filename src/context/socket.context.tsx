'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import EVENTS from '@/config/events';
import SOCKET_CONFIG from '@/config/socket.config';
import { nanoid } from 'nanoid';

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

  // TODO: Need to move to user context later
  // -  We need to make sure to handle in case there is no userId found, and we need to always keep checking the userId
  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      localStorage.setItem('userId', nanoid());
      console.log('New userId is generated.');
    }
  }, []);

  useEffect(() => {
    const clientSocket = io(SOCKET_CONFIG.SOCKET_URL, {
      reconnection: true,
      upgrade: true,
      transports: ['websocket', 'polling'],
    });

    setSocket(clientSocket);

    return () => {
      clientSocket.disconnect();
    };
  }, []);

  if (socket) {
    socket.on(EVENTS.SERVER.JOIN_SESSION, ({ sessionID }) => {
      setSessionID(sessionID);
    });

    socket.on(EVENTS.SERVER.LEAVE_SESSION, () => {
      setSessionID('');
    });
  }

  return <SocketContext.Provider value={{ socket, sessionID }} {...props} />;
};

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider;
