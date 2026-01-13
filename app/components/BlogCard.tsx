import Link from "next/link";
import { BlogPost } from "@/app/lib/data";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="rounded-lg border border-border bg-background p-6 transition-shadow hover:shadow-md">
      <div className="mb-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-surface px-2 py-1 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link href={`/blog/${post.slug}`}>
        <h3 className="mb-2 text-xl font-semibold text-foreground hover:text-primary">
          {post.title}
        </h3>
      </Link>
      <p className="mb-4 text-muted">{post.excerpt}</p>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{post.author}</span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>
    </article>
  );
}
