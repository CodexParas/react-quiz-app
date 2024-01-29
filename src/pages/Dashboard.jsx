import Header from "../components/Header";
import useUser from "../hooks/useUser";
import { Spinner } from "../components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();
  if (isLoading) {
    return <Spinner />;
  }
  if (!data) {
    toast.error("You need to login first!");
    navigate("/", { replace: true });
    return;
  }
  return (
    <div>
      <Header data={data} />
      Dashboard
    </div>
  );
};

export default Dashboard;
