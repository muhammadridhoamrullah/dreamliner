import { MdVerified } from "react-icons/md";
import { getDayjs } from "../../../utils/functionHelpers";
import { MdOutlinePause } from "react-icons/md";
import { IoPlay } from "react-icons/io5";

export default function StoryHeader({ user, time, togglePause, isPaused }) {
  return (
    <div className="absolute top-5 left-3 right-3 flex justify-between items-center z-20">
      <div className="flex justify-start items-center gap-2">
        {/* Awal Profile Picture */}
        <img
          src={user.avatar}
          alt="Profile Picture"
          className="w-9 h-9 rounded-full object-cover"
        />
        {/* Akhir Profile Picture */}

        {/* Awal Username */}
        <div className="flex justify-start items-center gap-1">
          <span className="text-sm font-semibold">{user.username}</span>
          {user.isVerified && <MdVerified className="text-blue-500" />}
          <span className="text-white/50 text-xs">{getDayjs(time)}</span>
        </div>
        {/* Akhir Username */}
      </div>

      {/* Awal Paused */}
      <button onClick={togglePause} className="">
        {isPaused ? (
          <IoPlay className="text-2xl text-white" />
        ) : (
          <MdOutlinePause className="text-2xl text-white" />
        )}
      </button>
      {/* Akhir Paused */}
    </div>
  );
}
