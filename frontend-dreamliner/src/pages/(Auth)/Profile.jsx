import { TbUsersPlus } from "react-icons/tb";

export default function Profile() {
  return (
    <div className="bg-green-900 w-full min-h-screen flex justify-center items-start py-6">
      {/* Awal Profile */}
      <div className="bg-white w-3/4 h-full flex flex-col gap-4 justify-start items-center ">
        {/* Awal Data User */}
        <div className="bg-pink-800 w-2/3 h-fit flex flex-col gap-2 justify-center items-center">
          {/* Awal Foto Profile dan Data Diri */}
          <div className="bg-gray-400 w-full h-fit flex justify-start items-start gap-4">
            {/* Awal Foto Profile */}
            <div className="relative bg-amber-950 w-36 h-36 rounded-full overflow-hidden shrink-0">
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEOW9y1yhTF_ZcQTR_0c4PIwmXJExloOWpcw&s"
                }
                alt="Foto Profil"
                className="absolute w-full h-full object-cover "
              />
            </div>
            {/* Akhir Foto Profile */}

            {/* Awal Data User */}
            <div className="bg-blue-400 flex-1 min-w-0 pt-2 flex flex-col gap-2 justify-start items-start">
              {/* Awal Username */}
              <div>Username</div>
              {/* Akhir Username */}
              {/* Awal Full Name */}
              <span>Full Name</span>
              {/* Akhir Full Name */}
              {/* Awal Post, Follower, and Following */}
              <span> Post Follower Following</span>
              {/* Akhir Post, Follower, and Following */}
            </div>
            {/* Akhir Data User */}
          </div>
          {/* Akhir Foto Profile dan Data Diri */}

          {/* Awal Button Follow */}
          <div className="bg-amber-900 w-full h-fit flex justify-center items-center gap-2">
            {/* Awal Button Follow */}
            <button className="text-white font-medium text-sm bg-blue-800 hover:bg-blue-900 w-[92%] h-12  text-center rounded-xl cursor-pointer">
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
