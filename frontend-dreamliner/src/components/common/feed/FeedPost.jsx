import { useSelector } from "react-redux";

export default function FeedPost({ data }) {
  const { loadingMyFeed } = useSelector((state) => state.post);
  console.log(loadingMyFeed, "loading di FeedPost");

  return (
    <div className="bg-yellow-900">
      <h1>{data?.caption}</h1>
    </div>
  );
}
