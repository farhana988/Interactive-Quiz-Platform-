/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getQuizHistory } from "../utils/db";

const Scoreboard = ({ score, totalQuestions, resetQuiz }) => {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getQuizHistory();
        setQuizHistory(history);
      } catch (error) {
        console.error("Failed to fetch quiz history:", error);
      }
    };
    fetchHistory();
  }, []);

  const reversedQuizHistory = [...quizHistory].reverse();

  return (
    <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
      <div>

      <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p className="text-lg">
        You scored {score} out of {totalQuestions}.
      </p>
      <button
        onClick={resetQuiz}
        className=" bg-green-500 text-white px-4 py-2 rounded"
        >
        Retake Quiz
      </button>
        </div>
      <div className=" ">
        <h3 className="text-xl font-bold mb-2">Quiz History</h3>
        <div className="h-96 overflow-x-scroll w-72">

        {reversedQuizHistory.length > 0 ? (
          reversedQuizHistory.map((attempt, index) => (
            <div key={attempt.id} className="mb-2 p-2 border rounded">
              <p>
                Attempt {quizHistory.length - index}: {attempt.score} /{" "}
                {attempt.totalQuestions}
              </p>
            </div>
          ))
        ) : (
          <p>No quiz history found.</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
