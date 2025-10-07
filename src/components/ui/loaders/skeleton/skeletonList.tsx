import Skeleton from "./skeletonBase";

const SkeletonList = ({ items = 5, showAvatar = true }) => (
  <div className="space-y-4">
    {[...Array(items)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        {showAvatar && <Skeleton width="48px" height="48px" rounded="full" />}
        <div className="flex-1 space-y-2">
          <Skeleton height="16px" width="40%" />
          <Skeleton height="14px" width="80%" />
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonList;
