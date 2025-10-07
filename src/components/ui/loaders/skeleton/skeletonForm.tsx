import Skeleton from "./skeletonBase";

const SkeletonForm = ({ fields = 4, hasButton = true }) => (
  <div className="space-y-4 max-w-md">
    {[...Array(fields)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton height="16px" width="30%" />
        <Skeleton height="40px" width="100%" rounded="md" />
      </div>
    ))}
    {hasButton && <Skeleton height="44px" width="120px" rounded="md" />}
  </div>
);

export default SkeletonForm;
