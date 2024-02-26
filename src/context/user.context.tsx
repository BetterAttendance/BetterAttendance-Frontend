'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

interface ClientContext {
    username: string;
    setUsername: (username: string) => void;
    handleSubmitUsername: (event: React.FormEvent<HTMLFormElement>) => void; // Add handleSubmitUsername to the interface
}

const UserContext = createContext<ClientContext>({
    username: '',
    setUsername: () => {},  // Initialize as an empty function
    handleSubmitUsername: () => {}, // Initialize as an empty function

});

const UserProvider = (props: any) => {
    const [username, setUsername] = useState<string>('');

    /* TypeScript will complain that parameter 'any' implicitly has an 'any' type
        So we need to declare it */
    const handleSubmitUsername = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUsername(event.currentTarget.username.value);

        // Save username to local storage
        localStorage.setItem('username', event.currentTarget.username.value);
    };

        useEffect(() => {
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
            }
        }, []);

        const contextValue = { username, setUsername, handleSubmitUsername };

        return (
            <UserContext.Provider value={contextValue} {...props} />
        );
    };

export const useUser = () => useContext(UserContext);
export default UserProvider;

