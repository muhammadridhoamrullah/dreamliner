export default function StoryProgressBar({ total, current, progress }) {
  return (
    <div className="bg-blue-600/20 absolute top-2 left-2 right-2 flex gap-1 z-20">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`flex-1 h-1 bg-white/30 rounded-full overflow-hidden`}
        >
          <div
            style={{
              width:
                index < current
                  ? "100%"
                  : index === current
                    ? `${progress}%`
                    : "0%",
            }}
            className="h-full bg-white rounded-full"
          ></div>
        </div>
      ))}
    </div>
  );
}
