import { useNavigate } from "react-router-dom";
import { Spinner } from "../components";
import Header from "../components/Header";
import useUser from "../hooks/useUser";
import useQuizes from "../hooks/useQuizes";

const StartQuiz = () => {
  const { data, isLoading } = useUser();
  const { data: quizData, isLoading: quizLoading } = useQuizes();

  const navigate = useNavigate();
  if (isLoading) {
    return <Spinner />;
  }
  if (!data) {
    navigate("/", { replace: true });
    return;
  }
  if (quizLoading) {
    return <Spinner />;
  }
  if (quizData) {
    navigate(`/quiz/${quizData._id}`, { replace: true });
    return;
  }

  return (
    <div>
      <Header data={data} />
      StartQuiz
    </div>
  );
};

export default StartQuiz;
