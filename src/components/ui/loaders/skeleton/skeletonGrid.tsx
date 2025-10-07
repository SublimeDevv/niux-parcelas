import SkeletonCard from "./skeletonCard";

const SkeletonGrid = ({
  columns = 3,
  rows = 2,
  gap = 4,
  cardType = "default",
}) => {
  const gapClasses = {
    2: "gap-2",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
  };

  return (
    <div className={`grid ${gridCols[columns]} ${gapClasses[gap]}`}>
      {[...Array(columns * rows)].map((_, i) => (
        <SkeletonCard key={i} showImage={cardType === "default"} lines={3} />
      ))}
    </div>
  );
};

export default SkeletonGrid;
