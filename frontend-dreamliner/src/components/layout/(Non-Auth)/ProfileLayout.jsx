import { data, Link, Outlet, useLocation } from "react-router-dom";
import Profile from "../../../pages/(Auth)/Profile";
import PostModalFeed from "../../common/post/PostModalFeed";
import { BsInstagram } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { LuSquarePlay } from "react-icons/lu";
import { GoPaperAirplane } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { ImCompass2 } from "react-icons/im";
import { FaRegHeart } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import { LuBoxes } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { RiVideoLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userLogin } from "../../../store/userSlice";
import toast from "react-hot-toast";
import MyFeed from "../../../pages/(Auth)/MyFeed";
import Explore from "../../../pages/(Auth)/Explore";
import Footer from "../../common/Footer";

export default function ProfileLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loadingUserLogin, dataUserLogin, errorUserLogin } = useSelector(
    (state) => state.user,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const backgroundLocation = location.state?.backgroundLocation;

  const profileData = location.state?.profileData;

  const menuItems = useMemo(
    () => [
      { name: "", path: "/", icon: BsInstagram },
      { name: "Home", path: "/", icon: GrHomeRounded },
      { name: "Reels", path: "/reels", icon: LuSquarePlay },
      { name: "Messages", path: "/messages", icon: GoPaperAirplane },
      { name: "Search", path: "/search", icon: GoSearch },
      { name: "Explore", path: "/explore", icon: ImCompass2 },
      {
        name: "Notifications",
        path: "/notifications",
        icon: FaRegHeart,
      },
      {
        name: "Create",
        path: null,
        icon: FiPlus,
        onClick: () => setIsModalOpen(true),
      },
      {
        name: "Profile",
        path:
          !loadingUserLogin && dataUserLogin
            ? `/${dataUserLogin?.username}`
            : "/auth/login",
        icon: FaRegUserCircle,
      },
      { name: "More", path: "/more", icon: HiMiniBars3 },
      { name: "Also from Meta", path: "/also-from-meta", icon: LuBoxes },
    ],
    [loadingUserLogin, dataUserLogin],
  );

  useEffect(() => {
    if (errorUserLogin) {
      toast.error(errorUserLogin);
    }
  }, [errorUserLogin]);

  useEffect(() => {
    if (localStorage.access_token) {
      dispatch(userLogin());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className=" min-h-screen relative">
      {/* Untuk Background */}
      {!backgroundLocation && (
        <div className="min-h-screen flex flex-col gap-6">
          <Outlet />
          <Footer />
        </div>
      )}
      {/* Untuk Modal */}
      {backgroundLocation && (
        <>
          {backgroundLocation.pathname === "/" ? (
            <MyFeed />
          ) : backgroundLocation.pathname === "/explore" ? (
            <Explore />
          ) : (
            <Profile data={profileData} />
          )}
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <PostModalFeed />
          </div>
        </>
      )}

      {/* Untuk Sidebar */}

      <div className="bg-white group w-20 hover:w-60 fixed  top-0 left-0 h-screen  z-40    overflow-hidden ">
        <div className=" w-full h-full flex flex-col justify-around items-center ">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const commonClass =
              "w-full flex justify-start px-6 py-3 items-center gap-4  hover:bg-gray-300 transition-colors duration-300 rounded-lg group-hover:rounded-lg  ";
            if (item.onClick) {
              return (
                <button
                  className={commonClass + "cursor-pointer"}
                  onClick={item.onClick}
                  key={item.name}
                >
                  {/* Awal Icon */}
                  <Icon size={22} />
                  {/* Akhir Icon */}

                  {/* Awal Nama */}
                  <span className="hidden  group-hover:block text-sm whitespace-nowrap font-semibold">
                    {item.name}
                  </span>
                  {/* Akhir Nama */}
                </button>
              );
            }

            return (
              <Link className={commonClass} to={item.path} key={item.name}>
                {/* Awal Icon */}
                <Icon size={22} />
                {/* Akhir Icon */}

                {/* Awal Nama */}
                <span className="hidden  group-hover:block text-sm whitespace-nowrap font-semibold">
                  {item.name}
                </span>
                {/* Akhir Nama */}
              </Link>
            );
          })}

          {/* Awal Modal */}
          {isModalOpen && (
            <div
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center cursor-pointer"
            >
              {/* Awal Form */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-100 h-110 rounded-2xl flex flex-col justify-between items-center overflow-hidden cursor-default"
              >
                {/* Awal Judul Create New Post */}
                <h2 className="w-full text-center py-3 font-semibold border-b border-gray-300">
                  Create new post
                </h2>
                {/* Akhir Judul Create New Post */}

                {/* Awal Form Input */}
                <div className="flex-1 w-full flex  flex-col justify-center items-center gap-4">
                  {/* Awal Icon */}
                  <div className=" w-fit  flex items-center">
                    <IoImageOutline className="text-5xl text-gray-500" />
                    <RiVideoLine className="text-5xl text-gray-500 " />
                  </div>
                  {/* Akhir Icon */}

                  {/* Awal Text Drag Your Photo & Video Here */}
                  <span className="text-xl font-semibold text-gray-500">
                    Drag your photo and video here
                  </span>
                  {/* Akhir Text Drag Your Photo & Video Here */}

                  {/* Awal Button Select From Your Computer */}
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-300 cursor-pointer text-sm">
                    Select from your computer
                  </button>
                  {/* Akhir Button Select From Your Computer */}
                </div>
                {/* Akhir Form Input */}
              </div>
              {/* Akhir Form */}

              {/* Awal Button Exit */}
              <button
                className="absolute top-0 right-0 m-4 "
                onClick={() => setIsModalOpen(false)}
              >
                <IoClose className="text-3xl text-white hover:scale-110 cursor-pointer" />
              </button>

              {/* Akhir Button Exit */}
            </div>
          )}
          {/* Akhir Modal */}
        </div>
      </div>
    </div>
  );
}
