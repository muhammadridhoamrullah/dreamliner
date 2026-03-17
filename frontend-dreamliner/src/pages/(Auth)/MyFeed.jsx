import { useDispatch, useSelector } from "react-redux";
import FeedStory from "../../components/common/feed/FeedStory";
import { useEffect } from "react";
import { fetchMyFeed } from "../../store/postSlice";
import toast from "react-hot-toast";
import FeedPost from "../../components/common/feed/FeedPost";
import LoadingSkeletonMyFeed from "../../components/skeleton/LoadingSkeletonMyFeed";
import FeedEmptyArray from "../../components/common/feed/FeedEmptyArray";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingExploreMore from "../../components/common/explore/LoadingExploreMore";
import EndMessage from "../../components/common/explore/EndMessage";

export default function MyFeed() {
  const dispatch = useDispatch();
  let { loadingMyFeed, errorMyFeed, dataMyFeed, hasMoreMyFeed, pageMyFeed } =
    useSelector((state) => state.post);

  //   useEffect untuk fetch data feed
  useEffect(() => {
    if (!dataMyFeed) {
      dispatch(fetchMyFeed(1));
    }
  }, [dispatch]);

  //   useEffect untuk handle error
  useEffect(() => {
    if (errorMyFeed) {
      toast.error(errorMyFeed);
    }
  }, [errorMyFeed]);

  if (loadingMyFeed && !dataMyFeed) {
    return <LoadingSkeletonMyFeed />;
  }

  if (errorMyFeed) {
    return <div>error cuy</div>;
  }

  // Function untuk load page selanjutnya saat user scroll ke bawah
  function loadMorePosts() {
    if (hasMoreMyFeed && !loadingMyFeed) {
      dispatch(fetchMyFeed(pageMyFeed + 1));
    }
  }
  return (
    <div className=" w-full min-h-screen flex justify-center items-start py-4">
      {/* Awal Bagian Feed */}
      <div className=" w-230 h-full flex flex-col gap-2 justify-center items-center">
        {/* Awal Story */}
        <FeedStory />
        {/* Akhir Story */}

        {/* Awal Feed Post */}

        {/* Jika array kosong / belum ada follow siapapun */}
        {/* {dataMyFeed && dataMyFeed.length === 0 && <FeedEmptyArray />} */}

        {/* Render Posts */}
        <InfiniteScroll
          dataLength={dataMyFeed?.length || 0}
          next={loadMorePosts}
          hasMore={hasMoreMyFeed}
          loader={<LoadingExploreMore />}
          endMessage={<EndMessage />}
          className="w-120 min-h-screen flex flex-col gap-6 justify-start items-center"
        >
          {dataMyFeed &&
            dataMyFeed.map((post) => <FeedPost key={post.id} data={post} />)}
        </InfiniteScroll>

        {/* Refetch loading - minor indicator */}
        {/* {loadingMyFeed && dataMyFeed && <LoadingSpinner />} */}

        {/* Akhir Feed Post */}
      </div>
      {/* Akhir Bagian Feed */}
    </div>
  );
}
