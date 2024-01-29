import { FaChevronRight } from "react-icons/fa6";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

// eslint-disable-next-line react/prop-types
const AuthButton = ({ Icon, label, provider }) => {
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();
  const handleClick = async () => {
    switch (provider) {
      case "GoogleAuthProvider":
        await signInWithRedirect(auth, googleAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error.message);
          });
        break;
      case "GithubAuthProvider":
        await signInWithRedirect(auth, githubAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error.message);
          });
        break;
      default:
        await signInWithRedirect(auth, googleAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error.message);
          });
    }
  };
  return (
    <div
      onClick={handleClick}
      className="w-[85%] px-4 py-2 rounded-md flex items-center justify-between cursor-pointer group bg-blue-400 hover:bg-blue-700 active:scale-95 duration-300 hover:shadow-md"
    >
      <Icon className="text-txtPrimary text-xl group-hover:text-white" />
      <p className="text-txtPrimary text-xl group-hover:text-white">{label}</p>
      <FaChevronRight className="text-txtPrimary text-base group-hover:text-white" />
    </div>
  );
};

export default AuthButton;
