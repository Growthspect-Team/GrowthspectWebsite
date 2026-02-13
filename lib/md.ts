/**
 * Markdown Blog CMS
 * 
 * Tento modul nahrazuje hardcoded blogData.ts.
 * Články se nyní píší jako .md soubory ve složce /content/blog/
 * a tento modul je automaticky načte, parsuje frontmatter metadata
 * a připraví data pro BlogPage komponentu.
 * 
 * Formát článku:
 * ---
 * title: "Název článku"
 * excerpt: "Krátký popis"
 * category: "Kategorie"
 * date: "Feb 4, 2026"
 * image: "https://..."
 * author: "Jméno Autora"
 * authorRole: "Role autora"
 * authorImage: "https://..."
 * ---
 * 
 * ## Obsah článku v Markdownu
 */

import { BlogPost } from '../types';

// ------------------------------------------------------------------
// 1) Frontmatter parser (lightweight, no external dependencies)
// ------------------------------------------------------------------

interface FrontmatterResult {
  data: Record<string, string>;
  content: string;
}

function parseFrontmatter(raw: string): FrontmatterResult {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const frontmatterBlock = match[1];
  const content = match[2];

  const data: Record<string, string> = {};

  for (const line of frontmatterBlock.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (key) {
      data[key] = value;
    }
  }

  return { data, content };
}

// ------------------------------------------------------------------
// 2) Reading time calculator
// ------------------------------------------------------------------

function calculateReadingTime(content: string, lang: string = 'cs'): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min ${lang === 'cs' ? 'čtení' : 'read'}`;
}

// ------------------------------------------------------------------
// 3) Slug generator (from filename)
// ------------------------------------------------------------------

function extractSlug(filePath: string): string {
  // "/content/blog/my-article.md" → "my-article"
  const parts = filePath.split('/');
  const fileName = parts[parts.length - 1];
  return fileName.replace(/\.mdx?$/, '');
}

// ------------------------------------------------------------------
// 4) Load all blog posts from /content/blog/*.md
// ------------------------------------------------------------------

// Vite's import.meta.glob loads all matching files at build time
const markdownFiles = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/**
 * Get all blog posts, sorted by date (newest first).
 */
export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  const entries = Object.entries(markdownFiles);

  for (let i = 0; i < entries.length; i++) {
    const [filePath, raw] = entries[i];
    const { data, content } = parseFrontmatter(raw);
    const slug = extractSlug(filePath);

    posts.push({
      id: i + 1,
      slug,
      title: data.title || 'Bez názvu',
      excerpt: data.excerpt || '',
      category: data.category || 'General',
      date: data.date || '',
      readTime: data.readTime || calculateReadingTime(content),
      image: data.image || '',
      author: data.author || '',
      authorRole: data.authorRole || '',
      authorImage: data.authorImage || '',
      content,
    });
  }

  // Sort by date (newest first)
  posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    // Handle invalid dates
    const isValidA = !isNaN(dateA);
    const isValidB = !isNaN(dateB);

    if (!isValidA && !isValidB) return 0;
    if (!isValidA) {
      console.warn(`Invalid date for post: ${a.title} (${a.date})`);
      return 1; // Move invalid dates to the end
    }
    if (!isValidB) {
      console.warn(`Invalid date for post: ${b.title} (${b.date})`);
      return -1;
    }

    return dateB - dateA;
  });

  // Re-assign IDs after sorting
  posts.forEach((post, index) => {
    post.id = index + 1;
  });

  return posts;
}

/**
 * Get a single blog post by slug.
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find(post => post.slug === slug);
}

/**
 * Get all unique categories.
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(p => p.category));
  return Array.from(categories);
}
