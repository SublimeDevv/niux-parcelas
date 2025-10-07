import Skeleton from "./skeletonBase";

const SkeletonCard = ({ showImage = true, lines = 3 }) => (
  <div className="border rounded-lg p-4 space-y-3">
    {showImage && <Skeleton height="200px" rounded="md" width={undefined} />}
    <Skeleton height="24px" width="70%" />
    {[...Array(lines)].map((_, i) => (
      <Skeleton
        key={i}
        height="16px"
        width={i === lines - 1 ? "60%" : "100%"}
      />
    ))}
  </div>
);

export default SkeletonCard;
