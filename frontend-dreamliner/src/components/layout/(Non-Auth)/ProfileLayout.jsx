import { Link, Outlet, useLocation } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { userLogin } from "../../../store/userSlice";
import toast from "react-hot-toast";

export default function ProfileLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loadingUserLogin, dataUserLogin, errorUserLogin } = useSelector(
    (state) => state.user,
  );

  const backgroundLocation = location.state?.backgroundLocation;
  const profileData = location.state?.profileData;

  const menuItems = useMemo(
    () => [
      { name: "", path: "/", icon: BsInstagram },
      { name: "Home", path: "/", icon: GrHomeRounded },
      { name: "Reels", path: "/reels", icon: LuSquarePlay },
      { name: "Messages", path: "/messages", icon: GoPaperAirplane },
      { name: "Search", path: "/search", icon: GoSearch },
      { name: "Browse", path: "/browse", icon: ImCompass2 },
      {
        name: "Notifications",
        path: "/notifications",
        icon: FaRegHeart,
      },
      { name: "Create", path: "/create", icon: FiPlus },
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

  return (
    <div className=" min-h-screen relative">
      {/* Untuk Background */}
      {!backgroundLocation && <Outlet />}
      {/* Untuk Modal */}
      {backgroundLocation && (
        <>
          <Profile data={profileData} />
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

            return (
              <Link
                className="w-full flex justify-start px-6 py-3 items-center gap-4  hover:bg-gray-300 transition-colors duration-300 rounded-lg group-hover:rounded-lg  "
                to={item.path}
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
