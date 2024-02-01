import { useState } from "react";
import shortUUID from "short-uuid";

import AnswerButton from "./AnswerButton";

const QuestionContent = (props) => {
  const [correct, setCorrect] = useState(false);

  const validationHandler = (fetchedData) => {
    setCorrect(fetchedData);
  };

  return (
    <div>
      {props.contents.map((item) => (
        <AnswerButton
          key={shortUUID().new()}
          content={item}
          question_id={props.question_id}
          onValidation={validationHandler}
        />
      ))}
      <div>Correct? {correct ? "Yes" : "No"}</div>
    </div>
  );
};

export default QuestionContent;
