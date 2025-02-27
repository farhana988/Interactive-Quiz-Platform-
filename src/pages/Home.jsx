import { Link } from "react-router-dom";
import bg from "../assets/bg.jpg"

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold bg-opacity-50 p-3 rotate-1">
        Welcome to the Interactive Quiz!
      </h1>
      <p className="bg-opacity-50 p-2 mt-2 text-base md:text-lg lg:text-xl font-semibold -rotate-1">
        Test your knowledge with our fun and interactive quizzes.
      </p>
      <Link to="/quiz">
        <button className="mt-4  px-8 py-2 bg-[#88b9b1] 
        text-base md:text-lg lg:text-xl font-semibold
         hover:bg-[#6178aa]  rounded
               rounded-bl-3xl rounded-tr-3xl  rotate-1">
          Start Quiz
        </button>
      </Link>
    </div>
  );
};

export default Home;
