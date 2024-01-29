import Header from "../components/Header";
import useUser from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../components";
import { toast } from "react-toastify";
import useQuizes from "../hooks/useQuizes";
import React, { useState } from "react";

const Quiz = () => {
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const { data, isLoading } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: quizData, isLoading: quizLoading } = useQuizes(id);
  if (isLoading || quizLoading) {
    return <Spinner />;
  }
  if (quizData._id != id) {
    navigate(`/quiz/${quizData._id}`, { replace: true });
    return;
  }
  if (!data) {
    toast.error("You need to login first!");
    navigate("/", { replace: true });
    return;
  }
  return (
    <div className="w-full h-screen flex flex-col items-start justify-start">
      <Header data={data} />
      <div className="w-full h-screen flex flex-col items-center justify-center flex-1">
        <div className="border-2 border-white flex flex-col px-4 py-3 rounded-md shadow-md">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-3xl font-bold text-center text-gray-300">
              Question
            </h1>
            <p className="text-xl font-medium text-center text-gray-300"></p>
          </div>
          <div className=""></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
