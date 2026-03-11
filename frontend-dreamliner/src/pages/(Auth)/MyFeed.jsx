import { useDispatch, useSelector } from "react-redux";
import FeedStory from "../../components/common/feed/FeedStory";
import { useEffect } from "react";
import { fetchMyFeed } from "../../store/postSlice";
import toast from "react-hot-toast";
import FeedPost from "../../components/common/feed/FeedPost";
import LoadingSkeletonMyFeed from "../../components/skeleton/LoadingSkeletonMyFeed";
import FeedEmptyArray from "../../components/common/feed/FeedEmptyArray";

export default function MyFeed() {
  const dispatch = useDispatch();
  let { loadingMyFeed, errorMyFeed, dataMyFeed } = useSelector(
    (state) => state.post,
  );


  //   useEffect untuk fetch data feed
  useEffect(() => {
    dispatch(fetchMyFeed());
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

  return (
    <div className=" w-full min-h-screen flex justify-center items-start py-4">
      {/* Awal Bagian Feed */}
      <div className="w-230 h-full flex flex-col gap-2 justify-center items-center">
        {/* Awal Story */}
        <FeedStory />
        {/* Akhir Story */}

        {/* Awal Feed Post */}
        <div className="w-120 min-h-screen flex flex-col gap-6 justify-start items-center">
          {/* Jika array kosong / belum ada follow siapapun */}
          {dataMyFeed && dataMyFeed.length === 0 && <FeedEmptyArray />}

          {/* Render Posts */}
          {dataMyFeed &&
            dataMyFeed.map((post) => <FeedPost key={post.id} data={post} />)}

          {/* Refetch loading - minor indicator */}
          {/* {loadingMyFeed && dataMyFeed && <LoadingSpinner />} */}
        </div>
        {/* Akhir Feed Post */}
      </div>
      {/* Akhir Bagian Feed */}
    </div>
  );
}
