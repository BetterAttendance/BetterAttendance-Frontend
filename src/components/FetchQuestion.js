import { getRandomInteger } from "../../backend/utils/questionUtils";

const getQuestion = async () => {
  // We only want the number of questions to be no less than 3
  let quantity = 0;
  while (quantity < 3) {
    quantity = getRandomInteger(6);
  }
  const res = await fetch(`http://localhost:3333/question/get?quantity=${quantity}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const FetchQuestion = (props) => {
  const clickHandler = async () => {
    const question = await getQuestion();
    props.onFetchQuestions(question);
  };

  return (
    <div>
      <button
        onClick={clickHandler}
        type="button"
        className="w-2/5 rounded-xl bg-slate-300 p-2 hover:bg-slate-200"
      >
        Fetch question
      </button>
    </div>
  );
};

export default FetchQuestion;
