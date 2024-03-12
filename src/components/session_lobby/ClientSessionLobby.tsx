import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/socket.context";
import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

export default function ClientSessionLobby() {
  const [username, setUsername] = useState<string>("");
  const { sessionCode } = useSocket();
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username !== null) {
      setUsername(username as string);
    }
  }, []);

  return (
    <>
      <Card className="p-5">
        <CardHeader>
          <Link href="/">Back</Link>
        </CardHeader>
        <CardBody className="flex items-center">
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
        </CardBody>
      </Card>
    </>
  );
}
