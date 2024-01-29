import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getQuestions } from "../api";
import { db } from "../config/firebase.config";

export const createQuiz = async () => {
  const quizes = await getQuestions();
  const totalQuestions = quizes.length;
  var selectedQuestions = [];
  while (selectedQuestions.length < 10) {
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    if (!selectedQuestions.includes(quizes[randomIndex])) {
      selectedQuestions.push(quizes[randomIndex]);
    }
  }
  const id = `${Date.now()}`;
  const _doc = {
    _id: id,
    questions: selectedQuestions,
    timestamp: serverTimestamp(),
  };
  return _doc;
};
