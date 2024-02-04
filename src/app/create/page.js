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
    <div className="m-auto w-3/5 border-4 border-solid p-2.5 text-center">
      <h1 className="main-header" style={{fontSize: '30px'}}>Welcome to BetterAttendance</h1>
      <h2>Please enter your name</h2>
      <input type="text" value={username} onChange={handleUsernameChange} 
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          margin: '5px 0',
          width: '360px',
          boxSizing: 'border-box',
          fontSize: '16px',
        }}
      />

      <form>
        <button type="button" onClick={handleCreateSession}
        style={{
          border: '1px solid #ccc',
          padding: '10px 20px',
          margin: '10px',
          backgroundColor: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
        }}>
          Create a session
        </button>
      </form>
    </div>
  );
};

export default Create;
