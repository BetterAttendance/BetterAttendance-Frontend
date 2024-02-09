"use client"

// Router must be imported from next/navigation if placed in app folder
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import socket from '@/components/socket';

const DEBUG = true;

const JoinSession = () => {
  const router = useRouter();
  const { sessionID } = useParams();
  
  // SearchParams is used to get the name from the URL
  const SearchParams = useSearchParams();
  const name = SearchParams.get('name');
  const [isLoading, setIsLoading] = useState(true);

  if (DEBUG) {
    console.log('sessionID:', sessionID);
    console.log('name:', name);
  }

  const [host, setHost] = useState('');
  const [usersCount, setUsersCount] = useState(0);

  const handleReturnToMainPage = () => {
    try {
      console.log('Disconnecting socket...');
      console.log('Socket ID:', socket.id); // Log the socket ID
      socket.disconnect();
      console.log('Socket disconnected');
      router.push('/');
    } catch (error) {
      console.error('Error disconnecting socket:', error);
    }
  };

  useEffect(() => {  
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on('num-users', ({count}) => {
      setUsersCount(count);
    });

    socket.on('user-joined', ({ username, sessionID, count}) => {
      if (sessionID === sessionID) {
        setUsersCount(count);
      }
      console.log(`${username} has joined the session`);
    });

    socket.on('user-left', ({ username, sessionID, count}) => {
      if (sessionID === sessionID) {
        setUsersCount(count);
      }
      console.log(`${username} has left the session`);
    });
  
    /* Disconnect when the client leaves their page 
      By using "beforeunload" event */
    return () => {
      window.removeEventListener("beforeunload", () => {
        socket.disconnect();
      });
    };
  }, []);

  useEffect(() => {
    // Fetch the host information from the backend
    const fetchHost = async () => {
      try {
        const response = await fetch(`http://localhost:3333/session/join/${sessionID}`);
        
        if (DEBUG) {
          console.log('Response:', response);
        }
        
        const data = await response.json();    

        if (data && data.host) {
          setHost(data.host);
          setIsLoading(false);
        } else {
          console.error('Host information not available');
        }
      } catch (error) {
        console.error('Error fetching host information:', error);
      }
    };
    
    // If sessionID exists, fetch the host information
    if (sessionID) {
      fetchHost(); // Call the function to fetch host information
      
      if (!isLoading) {       // We only want to call it once the session is fetched successfully
        socket.emit('fetch-num-users', sessionID); // Call the function to fetch the current number of attendees in the session
        console.log('fetch-num-users emitted')
      }
    } else {
      console.error('This sessionID does not exist. Please try again.');
    }

  }, [sessionID, isLoading]); // useEffect will run whenever sessionID changes

  return (
    <div className="m-auto w-3/5 border-4 border-solid p-2.5 text-center">
      <h1 className='main-header' style={{fontSize: '30px'}}>Hello {name}. Welcome to lobby session {sessionID}</h1>
      <h2>Hosted by {host}</h2>
      <h3>Users in the session: {usersCount}</h3>

      <button type='button' onClick={handleReturnToMainPage}
        style={{
          border: '1px solid #ccc',
          padding: '10px 20px',
          margin: '10px',
          backgroundColor: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
        }}>
      Return to main page</button>
    </div>
  );
};

export default JoinSession;
