import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type Post = {
  title: { rendered: string };
  content: { rendered: string };
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
 const res = await fetch(
  `${process.env.WORDPRESS_API_URL}/posts?slug=${params.slug}`,
  { next: { revalidate: 60 } }
);

  if (!res.ok) return <p>Failed to load blog post.</p>;

  const posts = await res.json();
  const post: Post = posts[0];

  if (!post) return <p>Post not found.</p>;

  const blogUrl = `https://amarihaircare.com/blog/${params.slug}`;
  const shareText = encodeURIComponent(post.title.rendered);
  const encodedUrl = encodeURIComponent(blogUrl);

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterUrl = `https://x.com/intent/tweet?url=${encodedUrl}&text=${shareText}`;

  return (
    <main className="max-w-3xl mx-auto py-5 px-4">
      <h1 className="text-3xl font-bold mb-6">{post.title.rendered}</h1>

      {/* Social Share Buttons with Icons */}
      <div className="flex gap-4 mb-6">
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-blue-700 text-white text-sm hover:bg-blue-800 transition"
        >
          <FaLinkedinIn size={16} /> LinkedIn
        </a>
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1877f2] text-white text-sm hover:bg-[#145dbf] transition"
        >
          <FaFacebookF size={16} /> Facebook
        </a>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-black text-white text-sm hover:bg-gray-800 transition"
        >
          <FaXTwitter size={16} /> X.com
        </a>
      </div>

      <article
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </main>
  );
}
