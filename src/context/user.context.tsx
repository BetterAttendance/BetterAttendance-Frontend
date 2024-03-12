'use client';

import { useContext, createContext, useEffect } from 'react';
import { nanoid } from 'nanoid';

interface UserContextType {
  generateNewUserId: () => void;
}

const UserContextType = createContext<UserContextType>({
  generateNewUserId: () => {},
});

const UserProvider = (props: any) => {
  // TypeScript will complain if we don't declare null as a possible value for userID

  const generateNewUserId = () => {
    localStorage.setItem('userId', nanoid());
    console.log('New userId is generated.');
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      generateNewUserId();
    } else {
      console.log('User already has a userId.');
    }
  }, []); // Only call once in session page

  const ContextValue = {
    generateNewUserId,
  };

  return <UserContextType.Provider value={ContextValue} {...props} />;
};

export const useUser = () => useContext(UserContextType);
export default UserProvider;
