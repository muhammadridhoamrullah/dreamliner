import { FaMeta } from "react-icons/fa6";

export default function LoadingSkeleton() {
  return (
    <div className="w-full min-h-screen  flex flex-col justify-center items-center">
      {/* Awal Logo Instagram */}
      <div className="flex-5 w-full h-full flex justify-center items-center">
        <img
          src={"/assets/images/logo_instagram.png"}
          alt="Logo Instagram"
          className="w-32 h-32 object-contain animate-pulse"
        />
      </div>
      {/* Akhir Logo Instagram */}

      {/* Awal From Meta */}
      <div className="flex-1  w-full h-full flex flex-col gap-2 justify-center items-center">
        {/* Awal From */}
        <span className="bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent">
          from
        </span>
        {/* Akhir From */}

        {/* Awal Meta */}
        <div className="flex justify-center items-center gap-1">
          {/* Awal Icon Meta */}

          <FaMeta size={30} className=" text-blue-700" />

          {/* Akhir Icon Meta */}
          {/* Awal Meta */}
          <span className="bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent text-lg font-semibold ">
            Meta
          </span>
          {/* Akhir Meta */}
        </div>
        {/* Akhir Meta */}
      </div>
      {/* Akhir From Meta */}
    </div>
  );
}
