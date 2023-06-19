import { useState } from "react";
import Input from "../components/Input";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginStatusAtom, userIdAtom } from "../state/atom";
import { Button } from "@mui/material";
import { fetcher } from "../utils/fetcher";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUserId = useSetRecoilState(userIdAtom);
  const isDisabled = username.length === 0 || password.length === 0;
  const setLogin = useSetRecoilState(loginStatusAtom);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await fetcher.post("/login", { username, password });
      toast.success("Login successful");
      setLogin(true);
      console.log(data);
      setUserId(data._id);
      navigate("/");
    } catch (err) {
      const error = err as AxiosError;
      toast.error(`Error ${error.response?.status} ${error.response?.data}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-5">
      <h1 className="text-2xl font-bold">Login</h1>
      <Input
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        id="username"
        type="text"
        value={username}
      />

      <Input
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        type="password"
        value={password}
      />
      <Button
        className={` ${isDisabled ? "opacity-30" : ""}`}
        style={{
          backgroundColor: "#3f51b5",
          color: "white",
          fontWeight: "bold",
          fontSize: "1rem",
          width: "fit-content",
        }}
        onClick={handleLogin}
        disabled={isDisabled}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
