import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductContainer = () => {
  const id = useParams();
  const [products, setProducts] = useState([]);
  const req = fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts([...products, data]);
    });
  return (
    <div>
      <div className="carousel w-full h-[80vh] my-4 rounded-md">
        <div id="slide1" className="carousel-item relative w-full opacity-80">
          <img
            src="https://i.ibb.co/5TtzmJ9/pexels-pixabay-356056.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full opacity-80">
          <img
            src="https://i.ibb.co/HtC1LZZ/pexels-ready-made-4032365.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full opacity-80">
          <img
            src="https://i.ibb.co/zfcfjxY/pexels-noah-erickson-404280.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full opacity-80">
          <img
            src="https://i.ibb.co/pR58zLX/pexels-abdullah-minhas-13364791.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        if (!products)
        {
          <div className="flex flex-col items-center gap-4">
            <Link to="/">
              <button className="btn btn-active bg-primary_clr">
                Go Back To Home
              </button>
            </Link>
            <img src={"https://i.ibb.co/7Gdk8Qv/error-2.webp"} alt="" />
          </div>
        }
      </div>
    </div>
  );
};

export default ProductContainer;
