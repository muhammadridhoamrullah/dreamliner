import { useDispatch, useSelector } from "react-redux";
import { followUser, followUserReset } from "../../../../store/userSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { TbUsersPlus } from "react-icons/tb";
import { useEffect, useMemo } from "react";
import { useRevalidator } from "react-router-dom";
import toast from "react-hot-toast";
import { useFollowStatus } from "../../../../hooks/customHooks";

export default function ProfileButtonFollowOrEditProfile({
  dataFindUser,
  isMe,
}) {
  const dispatch = useDispatch();
  const { revalidate } = useRevalidator();

  //   Selector untuk mendapatkan status follow user
  const { dataFollowUser, loadingFollowUser, errorFollowUser } = useSelector(
    (state) => state.user,
  );

  //   Selector untuk mendapatkan data user login
  const { dataUserLogin, loadingUserLogin, errorUserLogin } = useSelector(
    (state) => state.user,
  );

  // useEffect cek hasil follow user
  useEffect(() => {
    if (dataFollowUser) {
      toast.success(dataFollowUser.message);
      revalidate();
      dispatch(followUserReset());
    }
  }, [dataFollowUser, revalidate, dispatch]);

  //   useEffect untuk cek ada errorFollowUser atau tidak
  useEffect(() => {
    if (errorFollowUser) {
      toast.error(errorFollowUser);
    }
  }, [errorFollowUser]);

  // Function untuk cek apakah belum follow, sudah follow, atau belum follback
  const followStatus = useFollowStatus(dataFindUser, dataUserLogin);
  const isFollowing = followStatus === "Following";

  return (
    <div className="w-full h-fit flex justify-center items-center gap-2 font-medium text-sm">
      {isMe ? (
        <>
          {/* Awal Button Edit Profile */}
          <button className="bg-gray-300 hover:bg-gray-400 cursor-pointer w-full h-12 rounded-xl">
            Edit Profile
          </button>
          {/* Akhir Button Edit Profile */}

          {/* Awal Button Lihat Arsip */}
          <button className="bg-gray-300 hover:bg-gray-400 cursor-pointer w-full h-12 rounded-xl">
            Lihat Arsip
          </button>
          {/* Akhir Button Lihat Arsip */}
        </>
      ) : (
        <>
          {/* Awal Button Follow */}
          <button
            disabled={loadingFollowUser}
            onClick={() => dispatch(followUser(dataFindUser?.username))}
            className={`w-[92%] h-12 rounded-xl cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-500 ease-in-out ${isFollowing ? "bg-gray-300 hover:bg-gray-400 text-black" : "bg-blue-600 hover:bg-blue-900 text-white"} `}
          >
            {loadingFollowUser ? (
              <AiOutlineLoading size={20} className="animate-spin mx-auto" />
            ) : (
              followStatus
            )}
          </button>
          {/* Akhir Button Follow */}

          {/* Awal Akun Serupa */}
          <div className="bg-gray-300 hover:bg-gray-400 w-[8%] h-12 flex justify-center items-center rounded-xl">
            <TbUsersPlus className=" text-lg" />
          </div>
          {/* Akhir Akun Serupa */}
        </>
      )}
    </div>
  );
}
