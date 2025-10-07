import Skeleton from "./skeletonBase";

const SkeletonTable = ({ columns = 4, rows = 5 }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    {/* Header */}
    <div className="flex bg-gray-100 p-4 space-x-4">
      {[...Array(columns)].map((_, i) => (
        <Skeleton key={i} height="20px" className="flex-1" width={undefined} />
      ))}
    </div>
    {/* Rows */}
    <div className="divide-y divide-gray-200">
      {[...Array(rows)].map((_, rowIdx) => (
        <div key={rowIdx} className="flex p-4 space-x-4">
          {[...Array(columns)].map((_, colIdx) => (
            <Skeleton
              key={colIdx}
              height="16px"
              className="flex-1"
              width={undefined}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonTable;
