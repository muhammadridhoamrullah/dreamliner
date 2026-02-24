export default function ProfileFeeds({ data }) {
  return (
    <div>
      {data?.map((item, index) => (
        <div
          key={index}
          className="w-40 h-40 flex justify-start items-start flex-wrap bg-pink-900 rounded-md mb-2"
        >
          <p>{item.caption}</p>
        </div>
      ))}
    </div>
  );
}
