import Link from "next/link";
import { BlogPost } from "@/app/lib/data";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col rounded-none border border-zinc-100 bg-background p-8 transition-all hover:bg-zinc-50 hover:border-brand/30">
      <div className="mb-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-none border border-border bg-surface px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link href={`/blog/${post.slug}`}>
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-black transition-colors group-hover:text-brand">
          {post.title}
        </h3>
      </Link>
      <p className="mb-6 text-sm leading-relaxed text-zinc-500 line-clamp-3 font-medium">
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        <span className="text-black font-semibold">{post.author}</span>
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
