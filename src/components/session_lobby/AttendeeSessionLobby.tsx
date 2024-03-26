import { useState, useEffect } from 'react';
import { Spinner } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useUser } from '@/context/user.context';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/socket.context';

export default function AttendeeSessionLobby() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const { sessionCode } = useParams();
  const { validationDone } = useUser();
  const { usersConnected } = useSocket();

  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name !== null) {
      setUsername(name as string);
    }
  }, []);

  useEffect(() => {
    // We must use validationDone to prevent this code from running before the validation is done
    // Preventing the code redirect the host to join page as he/she doesn't have a username
    if (validationDone) {
      const name = localStorage.getItem('username');
      if (name == null || name === '') {
        router.push(`/join?session=${sessionCode}`);
      }
    }
  }, [validationDone, sessionCode, router]);

  return (
    <>
      <h1>
        {/* We only want to display the welcome portion when the username is available */}
        {username && <>Hello {username}! </>}Welcome to session room:{' '}
        {sessionCode}
      </h1>
      <h2 className="pb-5">Please wait until the host start the quiz</h2>
      {isQuizStarted ? <p>Boo!</p> : <Spinner />}
      <h2>Users connected: {usersConnected.toString()}</h2>
    </>
  );
}
