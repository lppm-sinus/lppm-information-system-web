import { Skeleton } from "../ui/skeleton";

const SkeletonText = () => {
  return (
    <div className="h-screen flex flex-col space-y-10 px-6 py-4">
      <span className="w-full flex justify-center items-center">
        <Skeleton className="w-1/4 h-5 bg-lppm_premier/15" />
      </span>
      <div className="space-y-4">
        <Skeleton className="w-full h-5 bg-lppm_premier/15" />
        <Skeleton className="w-[95%] h-5 bg-lppm_premier/15" />
        <Skeleton className="w-[85%] h-5 bg-lppm_premier/15" />
        <Skeleton className="w-[90%] h-5 bg-lppm_premier/15" />
      </div>
    </div>
  );
};

export default SkeletonText;
