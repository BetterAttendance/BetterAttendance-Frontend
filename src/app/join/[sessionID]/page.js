"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter, useParams } from 'next/navigation';

const socket = io("http://localhost:3333");

const DEBUG = true;

const Session = () => {
  const [username, setUsername] = useState("");
  const { sessionID } = useParams();
  const router = useRouter();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleJoinRequest = () => {
    if (username == "") {
      window.alert("Please enter your name before you continue.")
    } else {
      socket.emit('new-client', username)

      if (sessionID == "") {
        window.alert("Please enter the room session to connect.")
      } else {
        socket.emit("join-session", sessionID);
        socket.on("join-session-validate", (success) => {
          if (!success) {
            window.alert("The session ID you entered is invalid. Please try again.");
          }
          else {
            console.log("You have joined a session");
            router.push(`/sessions/${sessionID}?name=${username}`);    // Redirect to the session page with the session ID
          }
        });

        if (DEBUG) {
          console.log("handleUserName and handleJoinSession reached") 
        }
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
  }, []);

  return (
    <div className="m-auto w-3/5 border-4 border-solid p-2.5 text-center">
      <h1 className="main-header" style={{fontSize: '30px'}}>Welcome to BetterAttendance</h1>
      <h2>Please enter your name</h2>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
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
        <button type="button" className="submit" onClick={handleJoinRequest}
          style={{
            border: '1px solid #ccc',
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
          }}>
          Join a session
        </button>
      </form>
    </div>
  )
}

export default Session;