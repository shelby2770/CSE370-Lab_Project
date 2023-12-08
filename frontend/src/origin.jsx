import { Outlet, useLoaderData } from "react-router-dom";
import { createContext } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useState } from "react";

export const AssetContext = createContext();
const Origin = () => {
  const [bg_clr, set_bg_clr] = useState("bg-neutral-0");
  const data = useLoaderData();
  return (
    <div className={bg_clr}>
      <AssetContext.Provider value={[bg_clr, set_bg_clr]}>
        <NavBar data={data}></NavBar>
      </AssetContext.Provider>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Origin;
