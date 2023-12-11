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
export const AdminContext = createContext();
export const ReviewContext = createContext();
const Origin = () => {
  const [bg_clr, set_bg_clr] = useState("bg-neutral-0");
  const [get_name, set_get_name] = useState(null);
  const [get_image, set_get_image] = useState(null);
  const [get_item, set_get_item] = useState(null);
  // const { user, log_out } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const data = useLoaderData()["get_user"];
  const admins = useLoaderData()["get_admins"];
  const reviews = useLoaderData()["get_reviews"];

  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    if (user) {
      data.map((item) => {
        if (item.email === user.email) {
          admins.map((item2) => {
            if (item._id == item2.id) setAdmin(true);
          });
        }
      });
    }
  }, [user, isAdmin]);

  const [hasReview, setReview] = useState(reviews);
  useEffect(() => {
    setReview(reviews);
  }, [reviews]);

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
    } else {
      setAdmin(false);
    }
  }, [user, data]);
  return (
    <div className={bg_clr}>
      <AssetContext.Provider value={[bg_clr, set_bg_clr]}>
        <NameContext.Provider value={[get_name, set_get_name]}>
          <ImageContext.Provider value={[get_image, set_get_name]}>
            <ItemContext.Provider value={[get_item, set_get_item]}>
              <AdminContext.Provider value={[isAdmin, setAdmin]}>
                <ReviewContext.Provider value={[hasReview, setReview]}>
                  <NavBar isAdmin={isAdmin}></NavBar>
                  <Outlet></Outlet>
                  <Footer></Footer>
                </ReviewContext.Provider>
              </AdminContext.Provider>
            </ItemContext.Provider>
          </ImageContext.Provider>
        </NameContext.Provider>
      </AssetContext.Provider>
    </div>
  );
};

export default Origin;
