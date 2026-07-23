import { useMemo } from "react";
import { Link } from "react-router-dom";

// Function untuk cek apakah belum follow, sudah follow, atau belum follback
export function useFollowStatus(targetUser, currentUser) {
  return useMemo(() => {
    if (!currentUser) {
      return "Follow";
    }

    // Am I following this person?
    const isFollowing = targetUser?.Followers?.some(
      (follower) => follower?.id === currentUser?.id,
    );

    // Is this person following me?
    const isFollowedBy = targetUser?.Followings?.some(
      (following) => following?.id === currentUser?.id,
    );

    if (isFollowing && isFollowedBy) {
      return "Following"; // Mutual
    } else if (isFollowing) {
      return "Following";
    } else if (isFollowedBy) {
      return "Follow Back";
    } else {
      return "Follow";
    }
  }, [targetUser, currentUser]);
}

// Benefit:

// Reusable di mana saja (user cards, search, suggestions)
// Easier to test (unit test pure function)
// Less code duplication
// hooks/useFormatText.js
export function useFormatText(text, options = {}) {
  const { mentions = true, hashtags = false, urls = false } = options;

  return useMemo(() => {
    if (!text) return [];

    let pattern = "";
    if (mentions) pattern += "@[\\w.]+";
    if (hashtags) pattern += (pattern ? "|" : "") + "#[\\w]+";
    if (urls) pattern += (pattern ? "|" : "") + "https?://[^\\s]+";

    const parts = text.split(new RegExp(`(${pattern})`, "g"));

    return parts.map((part, idx) => {
      if (part.startsWith("@")) {
        return (
          <Link key={idx} to={`/${part.slice(1)}`}>
            {part}
          </Link>
        );
      }
      if (part.startsWith("#")) {
        return (
          <Link key={idx} to={`/explore/tags/${part.slice(1)}`}>
            {part}
          </Link>
        );
      }
      if (part.startsWith("http")) {
        return (
          <a key={idx} href={part} target="_blank">
            {part}
          </a>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  }, [text, mentions, hashtags, urls]);
}

// Benefit:

// Bisa dipakai di captions, comments
// Bisa extend dengan hashtag & URL support
// Centralized text parsing logic
