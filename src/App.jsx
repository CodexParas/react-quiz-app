import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Spinner } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddQuestion, Dashboard, Home, Quiz, StartQuiz } from "./pages";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/start-quiz" element={<StartQuiz />} />
        </Routes>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
