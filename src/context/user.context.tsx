'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import EVENTS from '@/config/events';
import { useSocket } from './socket.context';
import { nanoid } from 'nanoid';

interface UserContextType {
  userID: string;
  setUserID: (userId: string) => void;
  isHost: boolean;
  checkIfHost: (userId: string | null) => void;
}

const UserContextType = createContext<UserContextType>({
  userID: '',
  setUserID: () => {},
  isHost: false,
  checkIfHost: () => {},
});

const UserProvider = (props: any) => {
  const [userID, setUserID] = useState<string | null>('');
  const [isHost, setIsHost] = useState<boolean>(false);
  const { socket, sessionCode } = useSocket();

  // TypeScript will complain if we don't declare null as a possible value for userID
  const checkIfHost = (userID: string | null) => {
    if (socket) {
      console.log('Checking if user is host.');
      console.log('sessionCode: ', sessionCode);
      socket.emit(EVENTS.CLIENT.CHECK_IF_HOST, { userID, sessionCode });
      socket.on(EVENTS.SERVER.CHECK_IF_HOST, (data: { isHost: boolean }) => {
        setIsHost(data.isHost);
        console.log('User is host:', data.isHost);
      });
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      localStorage.setItem('userId', nanoid());
      console.log('New userId is generated.');

      // TypeScript will complain here despite we already checked for null
      setUserID(userId);
    } else {
      console.log('User already has a userId.');
      setUserID(userId);
    }
  }, []);

  useEffect(() => {
    if (userID && sessionCode) {
      checkIfHost(userID);
    }
  }, [userID, sessionCode]);

  const ContextValue = {
    userID,
    setUserID,
    isHost,
    checkIfHost,
  };

  return <UserContextType.Provider value={ContextValue} {...props} />;
};

export const useUser = () => useContext(UserContextType);
export default UserProvider;
