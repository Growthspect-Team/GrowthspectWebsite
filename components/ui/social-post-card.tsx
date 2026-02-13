import React from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface SocialPostCardProps {
  id?: string;
  author?: {
    name?: string;
    username?: string;
    avatar?: string;
    timeAgo?: string;
  };
  content?: {
    text?: string;
    link?: {
      title?: string;
      description?: string;
      icon?: React.ReactNode;
    };
  };
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
    isLiked?: boolean;
    isBookmarked?: boolean;
  };
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

const defaultProps: SocialPostCardProps = {
  author: {
    name: "Dorian Baffier",
    username: "dorian_baffier",
    avatar: "https://github.com/shadcn.png",
    timeAgo: "2h ago",
  },
  content: {
    text: "Just launched Ruixen UI! Check out the documentation and let me know what you think 🎨",
    link: {
      title: "Ruixen UI Documentation",
      description: "A comprehensive guide to Ruixen UI",
      icon: <LinkIcon className="w-5 h-5 text-blue-500" />,
    },
  },
  engagement: {
    likes: 128,
    comments: 32,
    shares: 24,
    isLiked: false,
    isBookmarked: false,
  },
};

export default function SocialPostCard({
  author = defaultProps.author,
  content = defaultProps.content,
  engagement = defaultProps.engagement,
  onLike,
  onComment,
  onShare,
  onBookmark,
  id = author?.username || "card-02",
}: SocialPostCardProps) {
  return (
    <div className="w-full max-w-lg mx-auto rounded-3xl bg-white/80 dark:bg-zinc-900/80 shadow-xl backdrop-blur-lg transition-all p-4">
      
      {/* Optional Link Box */}
      {content?.link && (
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800/60 p-4 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/40 transition">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-white dark:bg-zinc-700">
              {content.link.icon}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">{content.link.title}</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{content.link.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
