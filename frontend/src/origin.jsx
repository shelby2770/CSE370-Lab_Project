import { Outlet, useLoaderData } from "react-router-dom";
import { createContext } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useState } from "react";
// import { BsFillSunFill } from "react-icons/bs";
// import { BsFillMoonFill } from "react-icons/bs";

export const AssetContext = createContext();
const Origin = () => {
  // const [isDarkMode, setDarkMode] = useState(false);
  const [bg_clr, set_bg_clr] = useState("bg-neutral-0");
  // const handleSetMode = () => {
  //   if (bg_clr == "bg-neutral-0") {
  //     set_bg_clr("bg-neutral-950");
  //     setDarkMode(true);
  //   } else {
  //     set_bg_clr("bg-neutral-0");
  //     setDarkMode(false);
  //   }
  //   //console.log(bg_clr);
  // };
  const data = useLoaderData();
  return (
    <div className={bg_clr}>
      {/* {isDarkMode && (
        <BsFillMoonFill
          onClick={handleSetMode}
          className="absolute"
          size={20}
        />
      )}
      {!isDarkMode && (
        <BsFillSunFill onClick={handleSetMode} className="absolute" size={20} />
      )} */}
      <AssetContext.Provider value={[bg_clr, set_bg_clr]}>
        <NavBar data={data}></NavBar>
      </AssetContext.Provider>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Origin;
