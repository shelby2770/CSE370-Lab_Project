import Brand from "./Brand";
const Brands = ({ obj }) => {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {obj.map((item) => (
          <Brand key={item.id} item={item}></Brand>
        ))}
      </div>
    </div>
  );
};

export default Brands;
