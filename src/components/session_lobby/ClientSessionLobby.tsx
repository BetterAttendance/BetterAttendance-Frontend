import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useParams } from "next/navigation";

export default function ClientSessionLobby() {
  const [username, setUsername] = useState<string>("");
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const { sessionCode } = useParams();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username !== null) {
      setUsername(username as string);
    }
  }, []);

  return (
    <>
      <>
        <h1>
          Hello {username}! Welcome to session room: {sessionCode}
        </h1>
        <h2 className="pb-5">Please wait until the host start the quiz</h2>
        {isQuizStarted ? (
          <Button type="submit" color="primary" variant="solid">
            Join Quiz
          </Button>
        ) : (
          <Button type="submit" color="primary" variant="solid" isDisabled>
            Join Quiz
          </Button>
        )}
      </>
    </>
  );
}
