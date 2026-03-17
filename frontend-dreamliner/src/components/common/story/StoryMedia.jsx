export default function StoryMedia({ story }) {
  if (story.mediaType === "video") {
    return (
      <video
        src={story.mediaUrl}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <img
      src={story.mediaUrl}
      alt="Story"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
