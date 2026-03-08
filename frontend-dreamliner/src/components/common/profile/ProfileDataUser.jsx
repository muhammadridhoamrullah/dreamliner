import toast from "react-hot-toast";
import { BsGearWide, BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import {
  countFollowersAndFollowing,
  countPosts,
} from "../../../utils/functionHelpers";
import { Link } from "react-router-dom";
import ProfileStats from "./(ProfileDataUser)/ProfileStats";
import { useFormatText } from "../../../hooks/customHooks";

export default function ProfileDataUser({ dataFindUser, isMe }) {
  //   Function untuk memformat bio dengan mendeteksi @username dan menjadikannya link
  const formattedBio = useFormatText(dataFindUser?.bio || "");
  return (
    <div className="flex-1 min-w-0 pt-2 flex flex-col gap-2 justify-start items-start">
      {/* Awal Username */}
      <div className="w-full h-fit flex justify-start items-center gap-2">
        {/* Awal Username */}
        <span className="font-bold text-2xl">{dataFindUser?.username}</span>
        {/* Akhir Username */}

        {/* Awal isVerified? */}
        {dataFindUser?.isVerified && (
          <MdVerified className="text-blue-500 text-xl" />
        )}
        {/* Akhir isVerified? */}

        {/* Awal Titik Tiga */}
        {isMe ? (
          <button
            className="cursor-pointer"
            onClick={() => toast.success("Settings")}
          >
            <BsGearWide className="text-sm" />
          </button>
        ) : (
          <button
            className="cursor-pointer"
            onClick={() => toast.success("Three Dots")}
          >
            <BsThreeDots className="text-sm" />
          </button>
        )}

        {/* Akhir Titik Tiga */}
      </div>
      {/* Akhir Username */}

      {/* Awal Full Name */}
      <span>{dataFindUser?.fullName}</span>
      {/* Akhir Full Name */}
      {/* Awal Post, Follower, and Following */}
      <ProfileStats dataFindUser={dataFindUser} />
      {/* Akhir Post, Follower, and Following */}

      {/* Awal Bio */}
      <div className="w-full h-fit text-sm leading-relaxed whitespace-pre-line">
      {formattedBio}
      </div>
      {/* Akhir Bio */}
    </div>
  );
}
