import { useState, useEffect, use } from "react";
import { Button } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useUser } from "@/context/user.context";

export default function ClientSessionLobby() {
  const [username, setUsername] = useState<string>("");
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const { sessionCode } = useParams();
  const { validationDone } = useUser();

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name !== null) {
      setUsername(name as string);
    }
  }, []);

  useEffect(() => {
    if (validationDone) {
      const name = localStorage.getItem("username");
      if (name == null) {
        // No toast alert here because we want to disable the content
        window.alert("Username missing. Redirecting to join page.");
        window.location.href = "/join";
      }
    }
  }, [validationDone]);

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
