// types/wordpress.ts
export interface WordPressPost {
  ID: number
  title: string
  content: string
  excerpt: string
  slug: string
  date: string
  modified: string
  status: string
  featured_image?: string
  author?: {
    ID: number
    name: string
    avatar_URL: string
  }
  categories: {
    [key: string]: WordPressCategory
  }
  tags: {
    [key: string]: WordPressTag
  }
  URL: string
  short_URL: string
}

export interface WordPressCategory {
  ID: number
  name: string
  slug: string
  description: string
  post_count: number
}

export interface WordPressTag {
  ID: number
  name: string
  slug: string
  description: string
  post_count: number
}

export interface WordPressPage {
  ID: number
  title: string
  content: string
  slug: string
  date: string
  modified: string
  status: string
  parent: number | false
  featured_image?: string
  URL: string
}

export interface WordPressSiteInfo {
  ID: number
  name: string
  description: string
  URL: string
  is_private: boolean
  capabilities: {
    [key: string]: boolean
  }
}

export interface WordPressAPIResponse<T> {
  found: number
  posts: T[]
}