import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function ProfileFeeds({ data }) {
  const { dataUserLogin } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <div className="w-full  grid grid-cols-3 gap-1">
      {data?.Posts.map((post, idx) => {
        return (
          <Link
            to={dataUserLogin ? `/p/${post.id}` : "/auth/login"}
            state={{
              backgroundLocation: location,
              profileData: data,
            }}
            onClick={() => {
              if (!dataUserLogin) {
                toast.error("You need to login to view the post");
              }
            }}
            key={post.id}
            className="aspect-square relative group cursor-pointer"
          >
            {/* Awal Foto Post */}
            <img
              src={post.imageUrl}
              alt="Foto Feed"
              className="w-full h-full object-cover "
            />

            {/* Akhir Foto Post */}

            {/* Awal Overlay Like & Comment */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex justify-center items-center text-white font-semibold text-lg gap-4">
              {/* Awal Like */}
              <div className="flex justify-start items-center gap-2">
                <FaHeart size={24} />
                {post.Likes.length}
              </div>
              {/* Akhir Like */}
              {/* Awal Comment */}
              <div className="flex justify-start items-center gap-2">
                <FaComment size={24} />
                {post.Comments.length}
              </div>
              {/* Akhir Comment */}
            </div>
            {/* Akhir Overlay Like & Comment */}
          </Link>
        );
      })}
    </div>
  );
}
