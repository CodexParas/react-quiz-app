import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient } from "react-query";
import { Spinner } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
