import { Home, Language } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currencyAtom, loginStatusAtom } from "../state/atom";
import { Button } from "@mui/material";

function Landing() {
  const navigate = useNavigate();
  const [isLogged, setLogStatus] = useRecoilState(loginStatusAtom);
  const [currency, setCurrency] = useRecoilState(currencyAtom);
  const handleLogout = () => {
    setLogStatus(false);
    navigate(0);
  };
  return (
    <>
      <div className="flex w-full bg-blue-500 py-3 gap-x-3">
        <button className="text-white m-2 ml-4 flex items-center gap-x-2" onClick={() => navigate("/")}>
          <Home style={{ fontSize: 30 }} />
          <p>Home</p>
        </button>
        <div className="flex items-center text-white gap-x-3">
          <Language />
          <select
            name="currency"
            id="currency"
            value={currency}
            className="text-black p-1 rounded-md"
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="HNL">HNL</option>
          </select>
        </div>
        {!isLogged ? (
          <div className="flex ml-auto gap-y-2 mr-3 gap-x-4">
            <Button
              style={{ marginLeft: "auto", backgroundColor: "white", color: "black" }}
              onClick={() => navigate("login")}
            >
              Log in
            </Button>
            <Button onClick={() => navigate("register")} style={{ backgroundColor: "white", color: "black" }}>
              Register
            </Button>
          </div>
        ) : (
          <Button
            style={{ marginLeft: "auto", backgroundColor: "white", marginRight: "1%", color: "black" }}
            onClick={handleLogout}
          >
            Log out
          </Button>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Landing;
