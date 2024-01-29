import { useQuery } from "react-query";
import { getQuizes } from "../api";

const useQuizes = (id) => {
  const { data, isLoading, isError, refetch } = useQuery(
    "quiz",
    async () => {
      try {
        const quizID = await getQuizes(id);
        return quizID;
      } catch (error) {
        console.log(error);
      }
    },
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, isLoading, isError, refetch };
};
export default useQuizes;
