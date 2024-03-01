import { useState, useEffect } from 'react';
import { useSocket } from '@/context/socket.context';
import { Card, CardBody, CardHeader, Link } from '@nextui-org/react';
import { Button } from '@nextui-org/react';

export default function ClientSessionLobby() {
  const [username, setUsername] = useState<string>('');
  const { socket, sessionID } = useSocket();
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);

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

  return (
    <>
      <Card className="p-5">
        <CardHeader>
          <Link href="/">Back</Link>
        </CardHeader>
        <CardBody className="flex items-center">
          {username === '' ? (
            <>
              <h1>Welcome to session room: {sessionID}</h1>
              <form
                onSubmit={handleSubmitUsername}
                className="flex flex-col justify-center"
              >
                <label>Please enter your name to join:</label>
                <input type="text" name="username" />
                <Button type="submit" color="primary" variant="solid">
                  Submit
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1>
                Hello {username}! Welcome to session room: {sessionID}
              </h1>
              <h2 className="pb-5">
                Please wait until the host start the quiz
              </h2>
              {isQuizStarted ? (
                <Button type="submit" color="primary" variant="solid">
                  Join Quiz
                </Button>
              ) : (
                <Button
                  type="submit"
                  color="primary"
                  variant="solid"
                  isDisabled
                >
                  Join Quiz
                </Button>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
}
