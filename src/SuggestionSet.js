import React from 'react';
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const SuggestionItem = ({ data, onClick }) => {
  return (
    <span onClick={() => onClick(data)} className="suggestion-item">
      {data.id}
    </span>
  );
};

const Suggestions = ({
  onAnswerChange,
  questionId,
  questionLabel,
  postText,
  suggestions,
  defaultSuggestions,
}) => {
  const handleOnChangeAnsewer = (answer) => {
    onAnswerChange(questionId, answer.text, questionLabel);
  };

  return (
    <div>
      {
        suggestions ? (
          <div>
            {suggestions.map((item) => (
              <SuggestionItem onClick={handleOnChangeAnsewer} data={item} />
            ))}
          </div>
        ) : postText ? (
          <div>{postText}</div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: defaultSuggestions[getRandomInt(defaultSuggestions.length)].content,
            }}
          />
        )
      }
    </div>
  );
};

const SuggestionSet = ({
  questions,
  suggestionPanel,
  onAnswerChange,
  defaultSuggestions,
}) => {
  return (
    <div className={suggestionPanel.classes.panel}>
      <div class={suggestionPanel.classes.body}>
        {questions.map((question) => (
          <Suggestions
            onAnswerChange={onAnswerChange}
            {...question}
            defaultSuggestions={defaultSuggestions}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestionSet;
