import { blogPosts } from "@/app/lib/data";
import BlogCard from "@/app/components/BlogCard";

export const metadata = {
  title: "Blog | Cybrarians",
  description: "Insights, tutorials, and updates from our research group.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground">Blog</h1>
        <p className="mt-4 text-lg text-muted">
          Insights, tutorials, and updates from our research group
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {blogPosts.length === 0 && (
        <p className="text-center text-muted">No blog posts yet. Check back soon!</p>
      )}
    </div>
  );
}
