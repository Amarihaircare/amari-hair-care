'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react'; // You can replace with any icon lib

type Post = {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  jetpack_featured_media_url?: string;
};

const POSTS_PER_PAGE = 9;
const WP_API = 'https://public-api.wordpress.com/wp/v2/sites/amarihaircare-masbw.wordpress.com/posts';

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({
          per_page: String(POSTS_PER_PAGE),
          page: String(page),
        });
        if (searchQuery) query.set('search', searchQuery);

        const res = await fetch(`${WP_API}?${query.toString()}`);
        if (!res.ok) {
          if (res.status === 400 || res.status === 404) {
            setHasMore(false);
            if (page === 1) setPosts([]);
            return;
          }
          throw new Error('Failed to fetch');
        }

        const data: Post[] = await res.json();
        if (data.length < POSTS_PER_PAGE) setHasMore(false);

        if (page === 1) {
          setPosts(data);
        } else {
          const existingIds = new Set(posts.map((p) => p.id));
          const newPosts = data.filter((p) => !existingIds.has(p.id));
          setPosts((prev) => [...prev, ...newPosts]);
        }
      } catch (e: any) {
        setError(e.message || 'An error occurred');
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, searchQuery]);

  const handleSearch = () => {
    if (search.trim() !== searchQuery) {
      setPage(1);
      setHasMore(true);
      setPosts([]);
      setSearchQuery(search.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSeeMore = () => {
    if (hasMore && !loading) setPage((prev) => prev + 1);
  };

  const clearSearch = () => {
    setSearch('');
    setSearchQuery('');
    setPage(1);
    setPosts([]);
    setHasMore(true);
  };

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            id="blog-search"
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-[#064e3b] text-white rounded hover:bg-[#043c2d] transition"
        >
          Search
        </button>
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition text-sm"
          >
            Clear
          </button>
        )}
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md overflow-hidden flex flex-col"
          >
            {post.jetpack_featured_media_url && (
              <img
                src={post.jetpack_featured_media_url}
                alt={post.title.rendered}
                className="w-full h-60 object-cover"
              />
            )}

            <div className="p-4 flex flex-col flex-grow">
              <h3
                className="text-lg font-semibold mb-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div
                className="text-sm text-gray-600 prose prose-sm mb-4"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <div className="mt-auto text-right">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-green-700 hover:underline transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}

        {!loading && posts.length === 0 && (
          <div className="col-span-full text-center text-gray-600 py-20">
            {searchQuery
              ? `No posts found for "${searchQuery}"`
              : 'No posts available.'}
          </div>
        )}
      </div>

      {/* See More Button */}
      <div className="flex flex-col items-center mt-10">
        {error && <div className="mb-2 text-red-600 text-sm">{error}</div>}
        <button
          onClick={handleSeeMore}
          disabled={!hasMore || loading}
          className={`px-6 py-3 rounded text-white transition ${
            hasMore && !loading
              ? 'bg-[#064e3b] hover:bg-[#043c2d]'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {loading
            ? 'Loading...'
            : hasMore
            ? 'See More'
            : 'No More Posts'}
        </button>
      </div>
    </div>
  );
}
