"use client";

import FetchQuestion from "@/components/FetchQuestion";
import QuestionType from "@/components/QuestionType";
import { useState } from "react";
import QuestionContent from "./QuestionContent";

const BLANK_PAGE = []

const Board = () => {
  const [page, setPage] = useState(BLANK_PAGE);
  const [isClicked, SetIsClicked] = useState(false);

  const fetchQuestionsHandler = (fetchedQuestions) => {
    const updatedPage = fetchedQuestions.map((question) => {
      return {
        _id: question._id,
        type: question.type,
        contents: question.contents,
      };
    });
    setPage(updatedPage);
    SetIsClicked(true);
  };

  return (
    <div className="m-auto w-3/5 border-4 border-solid p-2.5 text-center">
      <h1 className="font-mono text-4xl">Better Attendance</h1>

      { // JSX in-line if statement
        isClicked && page.map((question, index) => (
            <div key={index}>
              <QuestionType type={question.type} />
              <div className="grid-col p-3">
                <QuestionContent question_id={question._id} contents={question.contents} />
              </div>
            </div>))
      }

      <FetchQuestion onFetchQuestions={fetchQuestionsHandler} />
    </div>
  );
};

export default Board;
