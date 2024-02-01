const validateAnswer = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });

  return response.json();
};

const AnswerButton = (props) => {
  const clickHandler = () => {
    const answer = props.content.toString();

    validateAnswer("http://localhost:3333/question/validate", {
      _id: props.question_id,
      answer: answer,
    }).then((data) => {
      props.onValidation(data.correct);
    });
  };

  return (
    <button
      onClick={clickHandler}
      type="button"
      className="m-5 rounded-full bg-slate-100 p-5 hover:bg-slate-50"
    >
      {props.content}
    </button>
  );
};

export default AnswerButton;
