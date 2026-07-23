import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingExploreMore() {
  return (
    <div className="flex justify-center items-center py-4">
      <AiOutlineLoading size={24} className="animate-spin text-gray-500" />
    </div>
  );
}
