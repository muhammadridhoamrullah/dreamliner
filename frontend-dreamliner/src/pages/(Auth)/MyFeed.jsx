import { useDispatch, useSelector } from "react-redux";
import FeedStory from "../../components/common/feed/FeedStory";
import { useEffect } from "react";
import { fetchMyFeed } from "../../store/postSlice";
import toast from "react-hot-toast";
import FeedPost from "../../components/common/feed/FeedPost";
export default function MyFeed() {
  const dispatch = useDispatch();
  const { loadingMyFeed, errorMyFeed, dataMyFeed } = useSelector(
    (state) => state.post,
  );
  console.log(loadingMyFeed, "loadingMyFeed");

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

  return (
    <div className=" w-full min-h-screen flex justify-center items-start py-4">
      {/* Awal Bagian Feed */}
      <div className="bg-pink-300 w-230 h-full flex flex-col gap-2 justify-center items-center">
        {/* Awal Story */}
        <FeedStory />
        {/* Akhir Story */}

        {/* Awal Feed Post */}
        <div className="bg-green-600 w-120 h-fit flex flex-col gap-2 justify-start items-center">
          {dataMyFeed?.map((post) => (
            <FeedPost key={post.id} data={post} />
          ))}
        </div>
        {/* Akhir Feed Post */}
      </div>
      {/* Akhir Bagian Feed */}
    </div>
  );
}
