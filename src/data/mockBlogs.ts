// add type for compile-time only imports
import type { Blog } from "../types/blog";

export const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Sharing My First Story",
    author: "Jane Doe",
    preview: "This is a short preview of my first blog post...",
    createdAt: "Jan 1, 2026",
  },
  {
    id: 2,
    title: "Lessons I Learned This Year",
    author: "John Smith",
    preview: "A few important lessons I picked up throughout the year...",
    createdAt: "Jan 3, 2026",
  },
  {
    id: 3,
    title: "Why I Started Writing",
    author: "Alex Johnson",
    preview: "Writing helped me organize my thoughts and ideas...",
    createdAt: "Dec 28, 2025",
  },
];
