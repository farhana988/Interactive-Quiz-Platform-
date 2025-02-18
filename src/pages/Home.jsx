
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen text-center ">
      <h1 className="text-2xl font-bold text-red-500">Welcome to the Interactive Quiz!</h1>
      <p className="text-red-700 mt-2">Test your knowledge with our fun and interactive quizzes.</p>
      <Link to="/quiz">
        <button className="mt-4 p-5 bg-blue-500 text-white rounded">Start Quiz</button>
      </Link>
     
    </div>
  );
};

export default Home;
