import { Outlet } from "react-router-dom";
import ProfileFeeds from "../profile/ProfileFeeds";

export default function ProfileL() {
  return (
    <div>
      <ProfileFeeds />
      <Outlet />
    </div>
  );
}
