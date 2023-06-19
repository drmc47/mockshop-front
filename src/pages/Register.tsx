import { useState } from "react";
import Input from "../components/Input";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { loginStatusAtom } from "../state/atom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const setLogin = useSetRecoilState(loginStatusAtom);
  const navigate = useNavigate();
  const isDisabled = username.length === 0 || password.length === 0;

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/register", { username, password, name });
      toast.success("Register successful");
      setLogin(true);
      navigate("/");
    } catch (err) {
      const error = err as AxiosError;
      toast.error(`Error ${error.response?.status} ${error.response?.data}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-5">
      <h1 className="text-2xl font-bold">Register</h1>

      <Input label="Name" onChange={(e) => setName(e.target.value)} id="name" type="text" value={name} />
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
        className={` ${isDisabled ? "opacity-50" : ""}`}
        style={{
          backgroundColor: "#3f51b5",
          color: "white",
          fontWeight: "bold",
          fontSize: "1rem",
          width: "fit-content",
        }}
        onClick={handleRegister}
        disabled={isDisabled}
      >
        Register
      </Button>
    </div>
  );
}

export default Register;
