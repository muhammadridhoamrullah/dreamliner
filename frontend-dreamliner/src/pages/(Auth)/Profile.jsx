import { TbUsersPlus } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { publicAPI } from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUsername } from "../../store/userSlice";
export default function Profile() {
  // State untuk menyimpan data user
  const { username } = useParams();
  const dispatch = useDispatch();
  const {
    loading: lUser,
    error: eUser,
    data: dUser,
  } = useSelector((state) => state.user);
  console.log(dUser, "USER");

  // useEffect untuk mendapatkan data user berdasarkan username
  useEffect(() => {
    if (username) {
      dispatch(fetchUserByUsername(username));
    }
  }, [dispatch, username]);

  // useEffect untuk menampilkan error jika terjadi error saat mendapatkan data user
  useEffect(() => {
    if (eUser) {
      toast.error(eUser);
    }
  }, [eUser]);

  // Function untuk Bio
  function formatBio(bio) {
    const parts = bio.split(/(@[\w.]+)/g); // Split berdasarkan @username

    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <Link
            key={index}
            to={`${part.slice(1)}`}
            className="text-blue-500 cursor-pointer  hover:underline"
          >
            {part}
          </Link>
        );
      }

      return <span key={index}>{part}</span>;
    });
  }
  return (
    <div className="bg-green-900 w-full min-h-screen flex justify-center items-start py-6">
      {/* Awal Profile */}
      <div className="bg-white w-3/4 h-full flex flex-col gap-4 justify-start items-center ">
        {/* Awal Data User */}
        <div className="bg-pink-800 w-2/3 h-fit flex flex-col gap-4 justify-center items-center">
          {/* Awal Foto Profile dan Data Diri */}
          <div className="bg-gray-400 w-full h-fit flex justify-start items-start gap-4">
            {/* Awal Foto Profile */}
            <div className="relative bg-amber-950 w-36 h-36 rounded-full overflow-hidden shrink-0">
              <img
                src={dUser?.avatar || `assets/images/defaultAvatar.png`}
                alt="Foto Profil"
                className="absolute w-full h-full object-cover "
              />
            </div>
            {/* Akhir Foto Profile */}

            {/* Awal Data User */}
            <div className="bg-pink-950 flex-1 min-w-0 pt-2 flex flex-col gap-2 justify-start items-start">
              {/* Awal Username */}
              <div className="bg-green-400 w-full h-fit flex justify-start items-center gap-2">
                {/* Awal Username */}
                <span className="font-bold text-2xl">{dUser?.username}</span>
                {/* Akhir Username */}

                {/* Awal isVerified? */}
                {dUser?.isVerified && (
                  <MdVerified className="text-blue-500 text-xl" />
                )}
                {/* Akhir isVerified? */}

                {/* Awal Titik Tiga */}
                <BsThreeDots className="text-sm" />

                {/* Akhir Titik Tiga */}
              </div>
              {/* Akhir Username */}

              {/* Awal Full Name */}
              <span>{dUser?.fullName}</span>
              {/* Akhir Full Name */}
              {/* Awal Post, Follower, and Following */}
              <div className="bg-green-500 w-full h-fit text-sm flex justify-start items-center gap-3">
                {/* Awal Post */}
                <div className="bg-pink-400 w-fit h-fit flex justify-start items-center gap-1">
                  {/* Awal Jumlah Post */}
                  <span className="font-semibold">100</span>
                  {/* Akhir Jumlah Post */}

                  {/* Awal Teks Post */}
                  <span>post</span>
                  {/* Akhir Teks Post */}
                </div>
                {/* Akhir Post */}

                {/* Awal Follower */}
                <div className="bg-purple-500 w-fit h-fit flex justify-start items-center gap-1">
                  {/* Awal Jumlah Followe */}
                  <span className="font-semibold">11,3 m</span>
                  {/* Akhir Jumlah Followe */}

                  {/* Awal Teks Follower */}
                  <span>Follower</span>
                  {/* Akhir Teks Follower */}
                </div>
                {/* Akhir Follower */}

                {/* Awal Following */}
                <div className="bg-neutral-500 w-fit h-fit flex justify-start items-center gap-1">
                  {/* Awal Jumlah Following */}
                  <span className="font-semibold">0</span>
                  {/* Akhir Jumlah Following */}

                  {/* Awal Teks Following */}
                  <span>Following</span>
                  {/* Akhir Teks Following */}
                </div>
                {/* Akhir Following */}
              </div>
              {/* Akhir Post, Follower, and Following */}

              {/* Awal Bio */}
              <div className=" w-full h-fit text-sm leading-relaxed whitespace-pre-line">
                {formatBio(dUser?.bio)}
              </div>
              {/* Akhir Bio */}
            </div>
            {/* Akhir Data User */}
          </div>
          {/* Akhir Foto Profile dan Data Diri */}

          {/* Awal Button Follow */}
          <div className="bg-amber-900 w-full h-fit flex justify-center items-center gap-2">
            {/* Awal Button Follow */}
            <button className="text-white font-medium text-sm bg-blue-600 hover:bg-blue-900 w-[92%] h-12  text-center rounded-xl cursor-pointer">
              Follow
            </button>
            {/* Akhir Button Follow */}

            {/* Awal Akun Serupa */}
            <div className="bg-gray-300 hover:bg-gray-400 w-[8%] h-12 flex justify-center items-center rounded-xl">
              <TbUsersPlus className=" text-lg" />
            </div>
            {/* Akhir Akun Serupa */}
          </div>
          {/* Akhir Button Follow */}
        </div>
        {/* Akhir Data User */}

        {/* Awal Feed */}
        <div className="bg-purple-500 w-full h-full">Feed Foto dan Reels</div>
        {/* Akhir Feed */}
      </div>
      {/* Akhir Profile */}
    </div>
  );
}

// {
//     "id": 13,
//     "username": "leehyein",
//     "email": "leehyein@gmail.com",
//     "fullName": "Lee Hyein",
//     "bio": "Lee Hyein NJZ",
//     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s",
//     "isVerified": true,
//     "createdAt": "2026-02-20T07:33:14.157Z",
//     "deletedAt": null
// }
