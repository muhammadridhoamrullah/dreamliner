import dayjs from "./utilsDayjs";

export function countLikes(likesLength) {
  if (likesLength < 1000) {
    return likesLength.toString();
  }

  if (likesLength < 1000000) {
    return (likesLength / 1000).toFixed(1).replace(".0", "") + "K";
  }

  if (likesLength < 1000000000) {
    return (likesLength / 1000000).toFixed(1).replace(".0", "") + "M";
  }

  return (likesLength / 1000000000).toFixed(1).replace(".0", "") + "B";
}

export function getDayjs(createdAt) {
  const now = dayjs();
  const created = dayjs(createdAt);

  const diffDays = now.diff(created, "day");

  if (diffDays < 7) {
    return created.fromNow();
  }

  return created.format("DD MMM YYYY");
}

export function countFollowersAndFollowing(followLength) {
  if (followLength < 1000) {
    return followLength.toString();
  } else if (followLength < 1000000) {
    return Math.floor(followLength / 1000) + "K";
  } else {
    const millions = (followLength / 1000000).toFixed(1);
    return `${parseFloat(millions)} M`;
  }
}

export function countPosts(posts) {
  return posts.length;
}


