import { memo } from "react";
import {
  countFollowersAndFollowing,
  countPosts,
} from "../../../../utils/functionHelpers";

export default memo(function ProfileStats({ dataFindUser }) {
  return (
    <div className="w-full h-fit text-sm flex justify-start items-center gap-3">
      {/* Awal Post */}
      <div className="sw-fit h-fit flex justify-start items-center gap-1">
        {/* Awal Jumlah Post */}
        <span className="font-semibold">
          {countPosts(dataFindUser?.Posts || [])}
        </span>
        {/* Akhir Jumlah Post */}

        {/* Awal Teks Post */}
        <span>posts</span>
        {/* Akhir Teks Post */}
      </div>
      {/* Akhir Post */}

      {/* Awal Follower */}
      <div className="w-fit h-fit flex justify-start items-center gap-1">
        {/* Awal Jumlah Followe */}
        <span className="font-semibold">
          {countFollowersAndFollowing(dataFindUser?.Followers.length)}
        </span>
        {/* Akhir Jumlah Followe */}

        {/* Awal Teks Follower */}
        <span>Follower</span>
        {/* Akhir Teks Follower */}
      </div>
      {/* Akhir Follower */}

      {/* Awal Following */}
      <div className="w-fit h-fit flex justify-start items-center gap-1">
        {/* Awal Jumlah Following */}
        <span className="font-semibold">
          {countFollowersAndFollowing(dataFindUser?.Followings.length)}
        </span>
        {/* Akhir Jumlah Following */}

        {/* Awal Teks Following */}
        <span>Following</span>
        {/* Akhir Teks Following */}
      </div>
      {/* Akhir Following */}
    </div>
  );
});

// Dipisahkan karena

// Kenapa?

// Bisa reused di modal followers/following, user cards, suggestions
// Bisa add click handlers nanti (show followers list modal)
// Independent testing
