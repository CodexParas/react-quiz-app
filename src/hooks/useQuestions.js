import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getQuestions } from "../api";

const useQuestions = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "questions",
    async () => {
      try {
        const questions = await getQuestions();
        return questions;
      } catch (error) {
        console.error(error);
        toast.error("Error loading questions");
      }
    },
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, isLoading, isError, refetch };
};
export default useQuestions;
