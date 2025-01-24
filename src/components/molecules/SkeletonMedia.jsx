import { Skeleton } from "../ui/skeleton";

const SkeletonMedia = () => {
  return (
    <div className="h-screen flex flex-col space-y-10 px-10 py-4">
      <div className="w-full flex justify-center items-center">
        <Skeleton className="w-1/4 h-5 bg-lppm_premier/15" />
      </div>
      <div className="flex items-start space-x-4">
        <Skeleton className="h-32 w-32 rounded-md" />
        <div className="space-y-6">
          <Skeleton className="h-5 w-36" />
          <div className=" space-y-2">
            <Skeleton className="h-5 w-96" />
            <Skeleton className="h-5 w-60" />
          </div>
        </div>
      </div>
      <div className="flex items-start space-x-4">
        <Skeleton className="h-32 w-32 rounded-md" />
        <div className="space-y-6">
          <Skeleton className="h-5 w-36" />
          <div className=" space-y-2">
            <Skeleton className="h-5 w-96" />
            <Skeleton className="h-5 w-60" />
          </div>
        </div>
      </div>
      <div className="flex items-start space-x-4">
        <Skeleton className="h-32 w-32 rounded-md" />
        <div className="space-y-6">
          <Skeleton className="h-5 w-36" />
          <div className=" space-y-2">
            <Skeleton className="h-5 w-96" />
            <Skeleton className="h-5 w-60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMedia;
