import { useState } from "react";
import Question from "./Question";
import Timer from "./Timer";
import Scoreboard from "./Scoreboard";
import Feedback from "./Feedback";
import { saveQuizAttempt } from "../utils/db";
import quiz from "../assets/quiz.png"

const Quiz = () => {
  // quiz questions and answers
  const questions = [
    {
      id: 1,
      type: "mcq",
      text: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      answer: "Mercury",
    },
    {
      id: 2,
      type: "mcq",
      text: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
    },
    {
      id: 3,
      type: "mcq",
      text: "Which of the following is primarily used for structuring web pages?",
      options: ["Python", "Java", "HTML", "C++"],
      answer: "HTML",
    },
    {
      id: 4,
      type: "mcq",
      text: "Which chemical symbol stands for Gold?",
      options: ["Au", "Gd", "Ag", "Pt"],
      answer: "Au",
    },
    {
      id: 5,
      type: "mcq",
      text: "Which of these processes is not typically involved in refining petroleum?",
      options: [
        "Fractional distillation",
        "Cracking",
        "Polymerization",
        "Filtration",
      ],
      answer: "Filtration",
    },
    {
      id: 6,
      type: "integer",
      text: "What is the value of 12 + 28?",
      answer: 40,
    },
    {
      id: 7,
      type: "integer",
      text: "How many states are there in the United States?",
      answer: 50,
    },
    {
      id: 8,
      type: "integer",
      text: "In which year was the Declaration of Independence signed?",
      answer: 1776,
    },
    {
      id: 9,
      type: "integer",
      text: "What is the value of pi rounded to the nearest integer?",
      answer: 3,
    },
    {
      id: 10,
      type: "integer",
      text: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
      answer: 120,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isIntegerSection, setIsIntegerSection] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSubmit = (answer) => {
    const isCorrectAnswer = questions[currentQuestion].answer === answer;
    setIsCorrect(isCorrectAnswer);
    setShowFeedback(true);

    setUserAnswers([
      ...userAnswers,
      {
        questionId: questions[currentQuestion].id,
        answer,
        isCorrect: isCorrectAnswer,
      },
    ]);
    if (isCorrectAnswer) setScore(score + 1);

    if (currentQuestion < questions.length - 1) {
      if (questions[currentQuestion + 1].type === "integer") {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setShowFeedback(false);
          if (
            questions[currentQuestion + 1].type === "integer" &&
            !isIntegerSection
          ) {
            setIsIntegerSection(true);
          }
        }, 1000);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
      }
    } else {
      setQuizCompleted(true);
      saveQuizAttempt({ score, totalQuestions: questions.length, userAnswers });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setIsIntegerSection(false);
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center text-center">
      {quizCompleted ? (
        <Scoreboard
          score={score}
          totalQuestions={questions.length}
          resetQuiz={resetQuiz}
        />
      ) : (
        <>
          <div className="relative ">
            {/* Background Image */}
            <img
              src={quiz}
              alt="Quiz Background"
              className="w-full  object-cover rounded-lg"
            />

            {/* Text on top of the image */}
            <h1 className="absolute flex items-center justify-center text-5xl font-bold
            top-36 left-36 md:top-52 md:left-52">
              Quiz
            </h1>
          </div>
          <Question
            question={questions[currentQuestion]}
            onSubmit={handleAnswerSubmit}
          />
          {questions[currentQuestion].type !== "mcq" && showFeedback && (
            <span className="absolute top-[510px] lg:top-[650px]">
              <Feedback isCorrect={isCorrect} />
            </span>
          )}
          {questions[currentQuestion].type === "mcq" ? (
            <div
              className="absolute top-[350px] md:top-[440px] lg:top-[580px] 
            right-44 md:right-[340px] lg:right-[670px] "
            >
              <Timer
                key={currentQuestion}
                duration={30}
                onTimeUp={() => handleAnswerSubmit(null)}
              />
            </div>
          ) : (
            <div
              className="absolute top-[450px] md:top-[500px] lg:top-[680px] 
            right-44 md:right-[340px] lg:right-[670px]  "
            >
              <Timer
                key="integer-timer"
                duration={30 * 60}
                onTimeUp={() => setQuizCompleted(true)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
