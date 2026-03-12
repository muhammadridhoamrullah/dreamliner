export default function LoadingSkeletonExplore() {
  return (
    <div className="w-full min-h-screen flex justify-center items-start py-4">
      {/* Awal Loading Skeleton Explore */}
      <div className="w-240 h-full grid grid-cols-3 gap-0.5 overflow-hidden rounded-md fixed">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-full aspect-square bg-gray-300 animate-pulse"
          ></div>
        ))}
      </div>
      {/* Akhir Loading Skeleton Explore */}
    </div>
  );
}
