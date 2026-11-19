import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import Link from '@/components/Link'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    },
    {}
  )

  console.log(postsByYear)

  return <div className="mt-12 space-y-14">
        {Object.keys(postsByYear).map((year) => {
          const list = postsByYear[year];
          return <section key={year} id={`archive-year-${year}`} className="scroll-mt-28">
            <div className="grid gap-3 border-b pb-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:items-end">
              <h2 className="serif-display text-4xl font-black">
                {year}
              </h2>
              <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)]">
                <span>{list.length} 篇</span>
                <span className="h-3 w-px" />
                <span className="h-3 w-px" />
                <span>7 个标签</span>
              </div>
            </div>

            <div className="year-timeline mt-4 space-y-1 pl-8">
              {list.map((post) => (
                <Link
                  key={post.slug}
                  href={`/post/${post.slug}`}
                  className="group relative grid gap-2 border-b py-4 pr-2 transition-colors md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center"
                >
                  <span className="year-dot" />
                  <span className="mono-meta md:pl-2">
                    12 · 8 分钟
                  </span>
                  <span className="min-w-0">
                    <span className="serif-display block text-lg font-bold leading-snug transition-colors">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-xs">
                      {post.tags.join(' · ')}
                    </span>
                  </span>
                  <span
                    className="mono-meta hidden text-right md:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        })}
      </div>
  // return <Main posts={posts} />
}
