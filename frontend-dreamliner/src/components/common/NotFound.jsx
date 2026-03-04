import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="-to-br from-[#3d0563]  to-[#d37f0b] w-full min-h-screen flex justify-center items-center gap-4">
      {/* Awal Tengah */}
      <div className="text-white w-200 h-90 flex justify-between items-center">
        {/* Awal Teks */}
        <div className=" w-full h-full flex flex-col gap-2 justify-center items-start px-6">
          {/* Awal ERROR 404 */}
          <span className="text-2xl font-medium">ERROR 404</span>
          {/* Akhir ERROR 404 */}

          {/* Awal Page Not Found */}
          <span className="text-4xl font-bold">Page Not Found!</span>
          {/* Akhir Page Not Found */}

          {/* Awal The Page */}
          <span className="font-semibold text-sm">
            The page you trying to access doesn't exist or has been removed.
          </span>
          {/* Akhir The Page */}

          {/* Awal Link Back Home */}
          <Link
            to={"/"}
            className="bg-green-800  text-sm py-2 px-4 rounded-xl hover:bg-green-900 font-semibold"
          >
            Go Back Home
          </Link>
          {/* Akhir Link Back Home */}
        </div>
        {/* Akhir Teks */}

        {/* Awal Image */}
        <div className="rounded-xl w-full h-full relative overflow-hidden">
          <img
            src={"/assets/images/notFound.jpg"}
            alt="Not Found"
            className="absolute w-full h-full object-cover "
          />
        </div>
        {/* Akhir Image */}
      </div>
      {/* Akhir Tengah */}
    </div>
  );
}
