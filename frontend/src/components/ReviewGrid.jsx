import { FaStar } from "react-icons/fa6";

const ReviewGrid = ({ item }) => {
  //   //console.log(item)
  const { name, image, review, star_rating } = item;
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  const stars = Array(5).fill({ star_rating });
  return (
    <div className="card px-2 mx-2 my-2 bg-base-100 shadow-xl border h-48">
      <figure className="pt-2">
        <img src={image} alt="" className="rounded-full h-8 w-8" />
      </figure>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-secondary_clr">{name}</h2>
        <div className="flex flex-row">
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={15}
                color={star_rating > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
        <p className="text-sm">{review}</p>
      </div>
    </div>
  );
};

export default ReviewGrid;
