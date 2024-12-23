import { Button, useToast } from "@chakra-ui/react";
import userAtom from "../atoms/adminAtom";
import { useRecoilState } from "recoil";

const Logout = () => {
  const toast = useToast();
  const setUser = useRecoilState(userAtom);
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      localStorage.removeItem("user-quest");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
