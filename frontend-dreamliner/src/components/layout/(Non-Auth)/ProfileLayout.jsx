import { Outlet, useLocation } from "react-router-dom";
import Profile from "../../../pages/(Auth)/Profile";
import PostModalFeed from "../../common/post/PostModalFeed";

export default function ProfileLayout() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      {/* Untuk Background */}
      {!backgroundLocation && <Outlet />}
      {/* Untuk Modal */}
      {backgroundLocation && (
        <>
          <Profile />
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <PostModalFeed />
          </div>
        </>
      )}
    </>
  );
}
