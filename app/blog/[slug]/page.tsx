import { blogPosts } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Cybrarians Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm text-primary hover:underline"
      >
        ← Back to Blog
      </Link>

      <header className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-foreground">{post.title}</h1>

        <div className="mt-4 flex items-center gap-4 text-muted">
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-muted">{post.excerpt}</p>
        <div className="mt-8 rounded-lg border border-border bg-surface p-6">
          <p className="text-center text-muted">
            Full blog content would be rendered here. Connect to a CMS or
            markdown files for complete blog functionality.
          </p>
        </div>
      </div>
    </article>
  );
}
