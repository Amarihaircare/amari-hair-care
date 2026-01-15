// app/blog/page.tsx
import { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";
import en from "@/language/en"; // Adjust this path if needed

export const metadata: Metadata = {
  title: en.aboutPageMetaTitle, // Replace if needed
  description: en.aboutPageMetaDescription,
};

export default function BlogPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="otherpages__hero relative flex w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <h1 className="mb-4 text-center text-4xl font-bold lg:text-6xl">Blog</h1>
          <p>Welcome to our Blog</p>
        </div>
      </section>

      {/* Blog List Section */}
       <section className="flex w-full flex-col items-center justify-center overflow-hidden bg-white pb-10 pt-10 lg:pb-20 lg:pt-20">
      <div className="flex w-full flex-col gap-10 px-5">
            <h2 className="text-2xl font-bold lg:text-4xl">Latest Posts</h2>
      
              <BlogList />
        </div>
      </section>
    </main>
  );
}
