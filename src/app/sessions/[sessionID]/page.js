"use client"

// Router must be imported from next/navigation if placed in app folder
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DEBUG = true;

const JoinSession = () => {
  const router = useRouter();
  const { sessionID } = useParams();
  
  // SearchParams is used to get the name from the URL
  const SearchParams = useSearchParams();
  const name = SearchParams.get('name');

  if (DEBUG) {
    console.log('sessionID:', sessionID);
    console.log('name:', name);
  }

  const [host, setHost] = useState('');

  const handleReturnToMainPage = () => {
    router.push('/');
  };

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
        } else {
          console.error('Host information not available');
        }
      } catch (error) {
        console.error('Error fetching host information:', error);
      }
    };

    if (sessionID) {
      fetchHost(); // Call the function to fetch host information
    }
    else {
      console.error('This sessionID does not exist. Please try again.');
    }

  }, [sessionID]); // useEffect will run whenever sessionID changes

  return (
    <div className="m-auto w-3/5 border-4 border-solid p-2.5 text-center">
      <h1 className='main-header' style={{fontSize: '30px'}}>Hello {name}. Welcome to lobby session {sessionID}</h1>
      <h2>Hosted by {host}</h2>

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
