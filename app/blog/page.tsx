import { blogPosts } from "@/app/lib/data";
import BlogCard from "@/app/components/BlogCard";
import PageHero from "@/app/components/PageHero";
import BottomCTA from "@/app/components/BottomCTA";

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        badge="Latest Insights"
        title={
          <>
            Insights From <br />
            <span className="text-gradient transition-transform duration-500">
              The Research Lab.
            </span>
          </>
        }
        description="Exploring The Latest Trends In Technology, Research Methodologies, And Academic Breakthroughs From Our Dedicated Collective."
      />

      <div className="w-full px-6 md:px-16 lg:px-24 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="rounded-none border border-zinc-100 bg-zinc-50/50 p-20 text-center">
            <p className="text-xl text-zinc-400 font-medium">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
      <BottomCTA />
    </div>
  );
}
