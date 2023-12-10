import { Outlet, useLoaderData } from "react-router-dom";
import { createContext, useContext, useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useState } from "react";
import { AuthContext } from "./AuthProvider";

export const AssetContext = createContext();
export const NameContext = createContext();
export const ImageContext = createContext();
export const ItemContext = createContext();
const Origin = () => {
  const [bg_clr, set_bg_clr] = useState("bg-neutral-0");
  const [get_name, set_get_name] = useState(null);
  const [get_image, set_get_image] = useState(null);
  const [get_item, set_get_item] = useState(null);
  // const { user, log_out } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  // if (user) {
  //   data.map((item) => {
  //     if (item.email == user.email) {
  //       //Email of a person is always unique
  //       set_get_name(item.name);
  //       set_get_image(item.image);
  //       set_get_item(item.item);
  //     }
  //   });
  // }
  useEffect(() => {
    if (user) {
      const userData = data.find((item) => item.email === user.email);
      if (userData) {
        set_get_name(userData.name);
        set_get_image(userData.image);

        data.map((item) => {
          if (item.email === user.email) {
            // const user = { item };
            set_get_item({ item });
          }
        });
        // console.log(data);
      }
    }
  }, [user, data]);
  return (
    <div className={bg_clr}>
      <AssetContext.Provider value={[bg_clr, set_bg_clr]}>
        <NameContext.Provider value={[get_name, set_get_name]}>
          <ImageContext.Provider value={[get_image, set_get_name]}>
            <ItemContext.Provider value={[get_item, set_get_item]}>
              <NavBar data={data}></NavBar>
              <Outlet></Outlet>
              <Footer></Footer>
            </ItemContext.Provider>
          </ImageContext.Provider>
        </NameContext.Provider>
      </AssetContext.Provider>
    </div>
  );
};

export default Origin;
