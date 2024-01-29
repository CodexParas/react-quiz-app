import { FaGoogle, FaGithub } from "react-icons/fa6";
import { AuthButton, Spinner } from "../components";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();
  if (isLoading) {
    return <Spinner />;
  }
  if (data) {
    navigate("/dashboard", { replace: true });
  }
  return (
    <div className="flex flex-col items-start justify-start py-2 px-4 w-full h-screen bg-white dark:bg-gray-800">
      <p className="text-gray-700 dark:text-gray-300">KBC Quiz</p>
      <div className="flex flex-col items-center justify-center w-full flex-1 gap-2">
        <h2 className="text-blue-400 text-3xl">Welcome to KBC Quiz</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Please login to get started
        </p>
        <div className="w-full lg:w-96 rounded-md flex flex-col items-center justify-start py-4 gap-6">
          <AuthButton
            Icon={FaGoogle}
            label="Sign in with Google"
            provider="GoogleAuthProvider"
          />
          <AuthButton
            Icon={FaGithub}
            label="Sign in with Github"
            provider="GithubAuthProvider"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
