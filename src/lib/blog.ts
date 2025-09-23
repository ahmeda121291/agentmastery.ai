import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime: string
  content: string
  faq?: Array<{
    question: string
    answer: string
  }>
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'AgentMastery Team',
        category: data.category || 'General',
        tags: data.tags || [],
        image: data.image,
        readingTime: stats.text,
        content,
        faq: data.faq
      }
    })

  // Sort posts by date
  return allPosts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'AgentMastery Team',
      category: data.category || 'General',
      tags: data.tags || [],
      image: data.image,
      readingTime: stats.text,
      content,
      faq: data.faq
    }
  } catch {
    return null
  }
}

export function getCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map(post => post.category))
  return Array.from(categories).sort()
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => post.category === category)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  const allPosts = getAllPosts()

  // Calculate similarity scores for each post
  const scoredPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0

      // Same category = 10 points
      if (post.category === currentPost.category) {
        score += 10
      }

      // Each matching tag = 5 points
      const matchingTags = post.tags.filter(tag => currentPost.tags.includes(tag))
      score += matchingTags.length * 5

      // Recent posts get a slight boost (1-3 points based on recency)
      const postDate = new Date(post.date).getTime()
      const currentDate = Date.now()
      const daysOld = (currentDate - postDate) / (1000 * 60 * 60 * 24)
      if (daysOld < 7) score += 3
      else if (daysOld < 30) score += 2
      else if (daysOld < 60) score += 1

      return { post, score }
    })
    .filter(item => item.score > 0) // Only posts with some relevance
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)

  // If not enough related posts, fill with recent posts from same category
  if (scoredPosts.length < limit) {
    const additionalPosts = allPosts
      .filter(post =>
        post.slug !== currentSlug &&
        !scoredPosts.some(p => p.slug === post.slug)
      )
      .slice(0, limit - scoredPosts.length)

    return [...scoredPosts, ...additionalPosts]
  }

  return scoredPosts
}

export type EndcapVariant = 'topic-cluster' | 'compare-tools' | 'quiz-cta'

export function getEndcapVariant(slug: string): EndcapVariant {
  // Use slug hash to deterministically rotate between variants
  const hash = slug.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0)
  }, 0)

  const variants: EndcapVariant[] = ['topic-cluster', 'compare-tools', 'quiz-cta']
  const index = Math.abs(hash) % variants.length

  return variants[index]
}