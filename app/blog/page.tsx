import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {})

  return (
    <div className="page-enter mx-auto w-full max-w-4xl px-5 py-12 lg:px-8 lg:py-16">
      <header className="hairline border-b pb-8">
        <p className="mono-meta mb-4">ARCHIVE / 归档</p>
        <h1 className="page-title">学不可以已</h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[var(--muted)]">
          共收录 {posts.length} 篇文章，按年份往下翻，偶尔会遇到写于同一天的两篇短文。
        </p>
      </header>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="mono-meta mr-1">年份</span>
        {Object.keys(postsByYear).map((year, index) => (
          <button key={index} type="button" className="chip cursor-pointer">
            {year}
            <span className="opacity-60">{postsByYear[year].length}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 space-y-14">
        {Object.keys(postsByYear).map((year) => {
          const list = postsByYear[year]
          return (
            <section key={year} id={`archive-year-${year}`} className="scroll-mt-28">
              <div className="hairline grid gap-3 border-b pb-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:items-end">
                <h2 className="serif-display text-4xl font-black">{year}</h2>
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
                    className="hairline group relative grid gap-2 border-b border-[var(--line)] py-4 pr-2 transition-colors hover:bg-[var(--panel-soft)] md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center"
                  >
                    <span className="year-dot" />
                    <span className="mono-meta md:pl-2">12 · 8 分钟</span>
                    <span className="min-w-0">
                      <span className="serif-display block text-lg leading-snug font-bold text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                        {post.title}
                      </span>
                      <span className="mt-1 block text-xs">{post.tags.join(' · ')}</span>
                    </span>
                    <span className="mono-meta hidden text-right md:block" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
