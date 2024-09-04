import { useRecoilValue } from "recoil";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import authScreenAtom from "../../atoms/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenState);
  return <div>{authScreenState === "login" ? <Login /> : <SignUp />}</div>;
};

export default AuthPage;
