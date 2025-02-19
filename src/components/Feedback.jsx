/* eslint-disable react/prop-types */

const Feedback = ({ isCorrect }) => {
  return (
    <div className={`mt-4 p-4 rounded ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
      {isCorrect ? "Correct! 🎉" : "Incorrect! 😢"}
    </div>
  );
};

export default Feedback;