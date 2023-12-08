const ReviewGrid = ({ item }) => {
//   //console.log(item)
  const { name, image, review } = item;
  //console.log(name, image, review);
  return (
    <div className="card px-2 mx-2 my-2 bg-base-100 shadow-xl border h-48">
      <figure className="pt-2">
        <img src={image} alt="" className="rounded-full h-8 w-8" />
      </figure>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-secondary_clr">{name}</h2>
        <p className="text-sm">{review}</p>
      </div>
    </div>
  );
};

export default ReviewGrid;
