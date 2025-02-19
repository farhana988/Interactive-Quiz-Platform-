/* eslint-disable react/prop-types */
import { useState } from "react";

const Question = ({ question, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      onSubmit(selectedAnswer);
      setSelectedAnswer("");
    }, 1000);
  };

  return (
    <div>
      <p className="text-lg lg:text-2xl mb-4">{question.text}</p>
      {question.type === "mcq" ? (
        <form onSubmit={handleSubmit}>
          {question.options.map((option, index) => {
            const isCorrect = option === question.answer;
            const isSelected = option === selectedAnswer;

            let optionStyle = "bg-white";
            if (showFeedback) {
              if (isCorrect) {
                optionStyle = "bg-green-300 border-green-500 ";
              } else if (isSelected) {
                optionStyle = "bg-red-300 border-red-500";
              }
            }

            return (
              <div
                key={index}
                className={`mb-2 p-2 rounded-bl-3xl rounded-tr-3xl 
                  rounded-lg ${optionStyle}`}
              >
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={isSelected}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="mr-2"
                    disabled={showFeedback}
                    required
                  />
                  {option}
                </label>
              </div>
            );
          })}
          <button
            type="submit"
            className={`mt-4 px-4 py-2 rounded text-white transition duration-300 ${
              !selectedAnswer || showFeedback
                ? "bg-gray-400 cursor-not-allowed opacity-50"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={!selectedAnswer || showFeedback}
          >
            Submit
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            className="bg-white p-4 rounded"
            disabled={showFeedback}
            required
          />
          <button
            type="submit"
            className={`mt-4 px-4 py-2 rounded text-white transition duration-300 ${
              !selectedAnswer || showFeedback
                ? "bg-gray-400 cursor-not-allowed opacity-50"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={!selectedAnswer || showFeedback}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Question;
