import { useDispatch, useSelector } from "react-redux";
import { fetchExplore } from "../../store/postSlice";
import { useEffect } from "react";
import LoadingSkeletonExplore from "../../components/skeleton/LoadingSkeletonExplore";
import toast from "react-hot-toast";
import FeedExplore from "../../components/common/explore/FeedExplore";

export default function Explore() {
  const dispatch = useDispatch();
  const { loadingExplore, dataExplore, errorExplore } = useSelector(
    (state) => state.post,
  );
  console.log(loadingExplore, "loadingExplore");
  console.log(dataExplore, "dataExplore");
  console.log(errorExplore, "errorExplore");

  useEffect(() => {
    dispatch(fetchExplore());
  }, [dispatch]);

  // useEffect untuk menampilkan error fetchExplore
  useEffect(() => {
    if (errorExplore) {
      toast.error(errorExplore);
    }
  }, [errorExplore]);

  if (loadingExplore && !dataExplore) {
    return <LoadingSkeletonExplore />;
  }

  return (
    <div className=" w-full min-h-screen flex justify-center items-start py-4">
      {/* Awal Explore */}
      <div className=" w-240 h-full grid grid-cols-3 gap-0.5 overflow-hidden ">
        {dataExplore &&
          dataExplore.map((post) => <FeedExplore key={post.id} data={post} />)}
      </div>
      {/* Akhir Explore */}
    </div>
  );
}
