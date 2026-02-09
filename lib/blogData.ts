import { getAllPosts } from './md';

// Blog posts are now loaded from /content/blog/*.md files.
// To add a new post, create a new .md file in that folder.
export const blogPosts = getAllPosts();

// Legacy hardcoded data removed. Original posts migrated to:
//   content/blog/chatboti-ve-firmach.md
//   content/blog/vibecoding-platformy.md
//   content/blog/rust-v-enterprise.md
//   content/blog/datova-sila-jsou-mrtva.md
