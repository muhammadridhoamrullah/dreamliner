import { Outlet } from "react-router-dom";
import Footer from "../../common/Footer";

export default function NonAuthLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center">
      {/* Awal Image dan Form */}
      <div className="w-full h-140 flex justify-center items-center">
        {/* Awal Image */}
        <div className="bg-white w-[55%] h-full flex flex-col gap-2 justify-start items-start px-12 py-8 border-b border-r border-gray-300">
          {/* Awal Logo Instagram */}
          <div className="w-30 h-24 relative">
            <img
              src={"/assets/images/logo_instagram.png"}
              alt="Logo Instagram"
              className="w-full h-full object-contain absolute"
            />
          </div>
          {/* Akhir Logo Instagram */}
          {/* Awal Kalimat */}
          <div className="w-full h-fit text-4xl text-center">
            Lihat momen sehari-hari dari{" "}
            <span className="bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent">
              teman
            </span>{" "}
            <span className="bg-linear-to-r from-pink-600 to-blue-900 bg-clip-text text-transparent">
              dekat
            </span>{" "}
            anda.
          </div>
          {/* Akhir Kalimat */}
          {/* Awal Image */}
          <div className="w-full h-64 flex justify-center items-center relative">
            <img
              src={"/assets/images/login_instagram.png"}
              alt="Hero Image"
              className="w-full h-full absolute object-contain"
            />
          </div>
          {/* Akhir Image */}
        </div>
        {/* Akhir Image */}
        {/* Awal Form */}
        <div className="w-[45%] h-full border-b border-gray-300">
          <Outlet />
        </div>
        {/* Akhir Form */}
      </div>
      {/* Akhir Image dan Form */}

      {/* Awal Footer */}
      <Footer />
      {/* Akhir Footer */}
    </div>
  );
}
