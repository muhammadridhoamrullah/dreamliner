export default function LoadingSkeletonMyFeed() {
  return (
    <div className=" w-full min-h-screen flex justify-center items-start py-4">
      <div className="w-230 h-full flex flex-col gap-2 justify-center items-center">
        {/* Awal Skeleton Story */}
        <div className=" w-full h-28 flex justify-center items-center gap-4">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="w-20 h-20 bg-gray-300 rounded-full animate-pulse"
            />
          ))}
        </div>
        {/* Akhir Skeleton Story */}

        {/* Awal Skeleton Feed */}
        <div className="bg-gray-300 w-120 h-110 rounded-md animate-pulse" />
        {/* Akhir Skeleton Feed */}
      </div>
    </div>
  );
}
