"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";

const socket = io("http://localhost:3333");

const DEBUG = true;

const Create = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCreateSession = () => {
    if (username == "") {
      window.alert("Please enter your name before you continue.");
    } else {
      socket.emit("new-client", username);
      socket.emit("create-session");
      console.log("You have created a session");

      socket.on("sessionID", (id) => {
        router.push(`/sessions/${id}`);
      });

      if (DEBUG) {
        console.log("handleUserName and handleCreateSession reached");
      }
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    /* Disconnect when the client leaves their page 
      By using "beforeunload" event */
    return () => {
      window.removeEventListener("beforeunload", () => {
        socket.disconnect();
      });
    };
  }, [router]);

  return (
    <>
      <h2>Please enter your name</h2>
      <input type="text" value={username} onChange={handleUsernameChange} />

      <button type="button" onClick={handleCreateSession}>
        Create a session
      </button>
    </>
  );
};

export default Create;
