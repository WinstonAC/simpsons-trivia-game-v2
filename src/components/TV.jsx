const TV = ({ question, options, score }) => {
  return (
    <div className="living-room-container">
      <div className="couch"></div>
      <div className="tv-container">
        <div className="tv-frame">
          <div className="tv-screen">
            <div className="question-text">
              {question}
            </div>
            <div className="options-container">
              {options.map((option, index) => (
                <div key={index} className="option">
                  {option}
                </div>
              ))}
            </div>
            <div className="score-display">
              Score: {score}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 