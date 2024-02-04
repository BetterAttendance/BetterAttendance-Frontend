"use client";

import React from 'react'
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  const handleStudentRequest = () => {
    router.push('/join'); // Redirect to the student page
  };

  const handleTeacherRequest = () => {
    router.push('/create'); // Redirect to the teacher page
  };

  return (
    <div className="m-auto w-3/5 border-4 border-solid p-2.5 text-center">
      <h1 className="main-header" style={{fontSize: '30px'}}>Welcome to BetterAttendance</h1>
      <h2>Are you a student or a teacher?</h2>
      <form>
        <button type="button" className="submit" onClick={handleStudentRequest}
          style={{
            border: '1px solid #ccc',
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
          }}>
          Student
        </button>

        <button type="button" className="create-session" onClick={handleTeacherRequest}
          style={{
            border: '1px solid #ccc',
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
          }}>
          Teacher
        </button>
      </form>
    </div>
  )
}

export default HomePage;
