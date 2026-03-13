import { useDispatch, useSelector } from "react-redux";
import { fetchExplore } from "../../store/postSlice";
import { useEffect } from "react";
import LoadingSkeletonExplore from "../../components/skeleton/LoadingSkeletonExplore";
import toast from "react-hot-toast";
import FeedExplore from "../../components/common/explore/FeedExplore";
import InfiniteScroll from "react-infinite-scroll-component";
import EndMessage from "../../components/common/explore/EndMessage";
import LoadingExploreMore from "../../components/common/explore/LoadingExploreMore";

export default function Explore() {
  const dispatch = useDispatch();
  const {
    loadingExplore,
    dataExplore,
    errorExplore,
    pageExplore,
    hasMoreExplore,
  } = useSelector((state) => state.post);
  console.log(dataExplore, "dataExplore");

  // Initial fetch saat pertama kali masuk ke halaman Explore
  useEffect(() => {
    if (!dataExplore) {
      console.log("Jalan Explore");

      dispatch(fetchExplore(1)); // Fetch halaman pertama
    }
  }, [dispatch, dataExplore]);

  // useEffect untuk menampilkan error fetchExplore
  useEffect(() => {
    if (errorExplore) {
      toast.error(errorExplore);
    }
  }, [errorExplore]);

  // Function untuk load page selanjutnya saat user scroll ke bawah
  function loadMorePosts() {
    if (!loadingExplore && hasMoreExplore) {
      dispatch(fetchExplore(pageExplore + 1));
    }
  }

  if (loadingExplore && !dataExplore) {
    return <LoadingSkeletonExplore />;
  }

  return (
    <div className=" w-full min-h-screen flex justify-center items-start py-12">
      {/* Awal Explore */}
      <div className=" w-240 ">
        <InfiniteScroll
          dataLength={dataExplore.length || 0}
          next={loadMorePosts}
          hasMore={hasMoreExplore}
          loader={<LoadingExploreMore />}
          endMessage={<EndMessage />}
        >
          <div className="h-full grid grid-cols-3 gap-0.5 overflow-hidden ">
            {dataExplore &&
              dataExplore.map((post) => (
                <FeedExplore key={post.id} data={post} />
              ))}
          </div>
        </InfiniteScroll>
      </div>
      {/* Akhir Explore */}
    </div>
  );
}

// // Early return: error
// if (errorExplore) {
//   return (
//     <div className="w-full min-h-screen flex justify-center items-center">
//       <div className="text-center">
//         <p className="text-red-500 mb-4">{errorExplore}</p>
//         <button
//           onClick={() => dispatch(fetchExplore(1))}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Retry
//         </button>
//       </div>
//     </div>
//   );
// }
