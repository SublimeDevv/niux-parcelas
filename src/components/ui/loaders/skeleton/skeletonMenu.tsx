import Skeleton from "./skeletonBase";

const SkeletonMenu = ({ items = 5, orientation = "horizontal" }) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={`flex ${
        isHorizontal ? "flex-row space-x-6" : "flex-col space-y-3"
      } p-4`}
    >
      {[...Array(items)].map((_, i) => (
        <Skeleton
          key={i}
          width={isHorizontal ? "80px" : "100%"}
          height="20px"
        />
      ))}
    </div>
  );
};

export default SkeletonMenu;
