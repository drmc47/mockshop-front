import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AllProducts from "../components/AllProducts";
import { useRecoilValue } from "recoil";
import { loginStatusAtom } from "../state/atom";
import Orders from "../components/Orders";

function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const isLogged = useRecoilValue(loginStatusAtom);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Box className="w-full h-full">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="w-3/4 mx-auto">
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="All products" />
          {isLogged && <Tab label="My orders" />}
        </Tabs>
      </Box>
      {selectedTab === 0 && <AllProducts />}
      {selectedTab === 1 && <Orders />}
      <hr />
    </Box>
  );
}

export default Home;
