"use client";

import { useContext, createContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

interface UserContextType {
  generateNewUserId: () => void;
  validationDone: boolean;
  setValidationDone: (value: boolean) => void;
}

const UserContextType = createContext<UserContextType>({
  generateNewUserId: () => {},
  validationDone: false,
  setValidationDone: () => {},
});

const UserProvider = (props: any) => {
  const [validationDone, setValidationDone] = useState<boolean>(false);

  const generateNewUserId = () => {
    localStorage.setItem("userId", nanoid());
    console.log("New userId is generated.");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      generateNewUserId();
    } else {
      console.log("User already has a userId.");
    }
  }, []); // Only call once in session page

  const ContextValue = {
    generateNewUserId,
    validationDone,
    setValidationDone,
  };

  return <UserContextType.Provider value={ContextValue} {...props} />;
};

export const useUser = () => useContext(UserContextType);
export default UserProvider;
