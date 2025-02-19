/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getQuizHistory } from "../utils/db";
import good from "../assets/good.png";

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
    <div className="flex flex-col md:flex-row-reverse gap-6 lg:gap-16 items-center ">
      <div>
        <img src={good} alt="" className="w-52 lg:w-60 " />
        <h2 className="text-2xl lg:text-4xl font-bold mb-1 ">Quiz Completed!</h2>
        <p className="text-lg">
          You scored {score} out of {totalQuestions}.
        </p>
        <button
          onClick={resetQuiz}
          className=" px-8 py-2  rounded-bl-3xl rounded-tr-3xl  text-white 
          bg-[#2c0866d3] hover:bg-[#2c0866af] mt-4"
        >
          Retake Quiz
        </button>
      </div>
      <div className=" ">
        <h3 className="text-2xl lg:text-4xl font-bold mb-2">Quiz History</h3>
        <div className="h-96 overflow-x-scroll w-72  ">
          {reversedQuizHistory.length > 0 ? (
            reversedQuizHistory.map((attempt, index) => (
              <div key={attempt.id} className="mb-2 p-2 border-1 border-[#2c0866d3]
               bg-orange-300 rounded
               rounded-bl-3xl rounded-tr-3xl lg:text-xl">
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
