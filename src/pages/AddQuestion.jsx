import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components";
import { adminIds } from "../utils/helpers";
import Header from "../components/Header";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa6";
import useQuestions from "../hooks/useQuestions";

const AddQuestion = () => {
  const initialQuizData = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "1",
  };
  const [quizData, setQuizData] = useState(initialQuizData);
  const navigate = useNavigate();
  const { data, isLoading } = useUser();
  const {
    data: questions,
    isLoading: questionsLoading,
    refetch: questionsRefetch,
  } = useQuestions();
  if (isLoading) {
    return <Spinner />;
  }
  if (!data) {
    toast.error("You need to login first!");
    navigate("/", { replace: true });
    return;
  }
  if (!adminIds.includes(data?.uid)) {
    toast.error("You need to be admin to access this page!");
    navigate("/dashboard", { replace: true });
    return;
  }
  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
    // console.log(quizData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(quizData);
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      question: quizData.question,
      options: [
        quizData.option1,
        quizData.option2,
        quizData.option3,
        quizData.option4,
      ],
      correctOption: quizData.correctOption,
      timeStamp,
    };
    await setDoc(doc(db, "questions", id), _doc)
      .then(() => {
        setQuizData(initialQuizData);
        questionsRefetch();
        toast.success("Quiz created successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const removeQuiz = async (quiz) => {
    await deleteDoc(doc(db, "questions", quiz._id))
      .then(() => {
        toast.success("Quiz deleted successfully!");
        questionsRefetch();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="h-screen w-full flex flex-col items-start justify-start">
      <Header data={data} />
      <div className="grid w-full flex-1 grid-cols-1 lg:grid-cols-12 h-full overflow-hidden">
        <div className="col-span-12 lg:col-span-3 2xl:col-span-3 border-r-2 border-gray-500 flex flex-col items-center justify-center py-6 h-screen overflow-y-hidden">
          <h1 className="text-gray-700 dark:text-white text-3xl">
            Add Question
          </h1>
          <form className="w-full h-full px-4 py-3">
            <div className="flex flex-col items-center justify-start gap-2">
              <div>
                <div className="mb-5">
                  <label
                    htmlFor="question"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Question
                  </label>
                  <input
                    type="text"
                    id="question"
                    name="question"
                    value={quizData.question}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="option1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Option 1
                  </label>
                  <input
                    type="text"
                    id="option1"
                    name="option1"
                    value={quizData.option1}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="option2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Option 2
                  </label>
                  <input
                    type="text"
                    id="option2"
                    name="option2"
                    value={quizData.option2}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="option3"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Option 3
                  </label>
                  <input
                    type="text"
                    id="option3"
                    name="option3"
                    value={quizData.option3}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="option4"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Option 4
                  </label>
                  <input
                    type="text"
                    id="option4"
                    name="option4"
                    value={quizData.option4}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="correctOption"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Correct Option
                  </label>
                  <select
                    id="correctOption"
                    name="correctOption"
                    value={quizData.correctOption}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium tracking-wider text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={(e) => handleSubmit(e)}
              >
                Add Question
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9 w-full px-2 flex-1 py-4 overflow-y-auto scrollbar-none mb-20">
          {questionsLoading ? (
            <React.Fragment>
              <div className="w-full h-full flex items-center justify-center">
                <PuffLoader color="#498FCD" size={60} />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {questions && questions?.length > 0 ? (
                <React.Fragment>
                  <div className="w-full h-auto grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-4">
                    {questions.map((quiz) => (
                      <div
                        className="w-full h-auto rounded-md overflow-hidden relative flex flex-col items-start justify-start px-4 gap-2 py-3 border-2 border-gray-300 dark:border-gray-700 shadow-md"
                        key={quiz?._id}
                      >
                        <h2 className="text-gray-600 text-lg dark:text-white mr-10">
                          Question:- {quiz?.question}
                        </h2>
                        <p className="text-gray-600 dark:text-white">Options</p>
                        <div className="flex flex-col items-start justify-start ">
                          {quiz?.options?.map((option, index) => (
                            <p
                              className="text-gray-600 dark:text-white text-sm"
                              key={index}
                            >
                              Option {index + 1}:- {option}
                            </p>
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-white">
                          Correct Option:-{" "}
                          {quiz?.options[quiz?.correctOption - 1]}
                        </p>
                        <div
                          className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-md flex items-center justify-center cursor-pointer"
                          onClick={() => removeQuiz(quiz)}
                        >
                          <FaTrash className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <PuffLoader color="#498FCD" size={60} />
                    <p className="text-2xl tracking-wider capitalize text-gray-600 dark:text-white">
                      No Data
                    </p>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
