import { MdVerified } from "react-icons/md";
import AvatarPreview from "../AvatarPreview";
import { BsGearWide, BsThreeDots } from "react-icons/bs";
import {
  countFollowersAndFollowing,
  countPosts,
} from "../../../utils/functionHelpers";
import { TbUsersPlus } from "react-icons/tb";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useRevalidator } from "react-router-dom";
import { followUser, followUserReset } from "../../../store/userSlice";
import ProfileDataUser from "./ProfileDataUser";
import ProfileButtonFollowOrEditProfile from "./(ProfileHeader)/ProfileButtonFollowOrEditProfile";

export default function ProfileHeader({ dataFindUser }) {
  const { dataUserLogin } = useSelector((state) => state.user);

  // variabel untuk cek apakah user yang sedang login sama dengan user yang sedang dilihat
  const isMe = dataFindUser?.isMine;

  return (
    <div className="w-2/3 h-fit flex flex-col gap-4 justify-center items-center">
      {/* Awal Foto Profile dan Data Diri */}
      <div className="w-full h-fit flex justify-start items-start gap-4">
        {/* Awal Foto Profile */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden shrink-0">
          <AvatarPreview
            src={dataFindUser?.avatar || "assets/images/defaultAvatar.png"}
            className="w-full h-full object-cover "
          />
        </div>
        {/* Akhir Foto Profile */}

        {/* Awal Data User */}
        <ProfileDataUser dataFindUser={dataFindUser} isMe={isMe} />
        {/* Akhir Data User */}
      </div>
      {/* Akhir Foto Profile dan Data Diri */}

      {/* Awal Button Follow / Edit Profile */}
      {dataUserLogin && (
        <ProfileButtonFollowOrEditProfile
          dataFindUser={dataFindUser}
          isMe={isMe}
        />
      )}
      {/* Akhir Button Follow / Edit Profile */}
    </div>
  );
}
