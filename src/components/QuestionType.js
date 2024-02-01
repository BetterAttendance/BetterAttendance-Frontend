const QuestionType = (props) => {
  if (props.type === 'number') {
    return <div>Select the correct number displayed on the screen</div>;
  } else {
    return <div>Press the fetch question button to get started.</div>;
  }
};

export default QuestionType;
