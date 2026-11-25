import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Link from '@/components/Link'
import tagData from 'app/tag-data.json'

const MAX_DISPLAY = 5

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="page-enter">
      <section className="hairline relative overflow-hidden border-b">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pt-12 pb-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:px-8 lg:pt-20 lg:pb-20">
          <div>
            <p className="mono-meta mb-5 flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--green)]" />自 2013
              年开始的长期记录
            </p>
            <h1 className="page-title max-w-2xl">关于技术、阅读的笔记。</h1>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-[var(--muted)]">
              一个独立博客，记录个人对技术的理解和开发过程中遇到的问题、欢迎了解更多。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex h-10 cursor-pointer items-center rounded-full bg-[var(--ink)] px-5 text-sm font-medium text-white! transition-colors hover:bg-[var(--accent)]"
              >
                关于我
              </Link>
            </div>
          </div>

          <aside className="soft-panel hairline rounded-lg p-6 lg:max-w-sm">
            <div className="flex items-center justify-between">
              <p className="focus-number">SITE NOTE / 站点手记</p>
              <span className="mono-meta">{new Date().getFullYear()}</span>
            </div>
            <p className="serif-display mt-5 text-[22px] leading-relaxed font-bold text-[var(--ink)]">
              “允许自己写得慢一点，
              <br />
              也允许内容偶尔没有结论。”
            </p>
            <div className="hairline mt-5 border-t pt-4 text-sm leading-6 text-[var(--muted)]">
              写作在这里不是输出，而是个人对技术的理解和开发过程中遇到的问题思考的方式。
            </div>
          </aside>
        </div>
      </section>

      <section
        id="latest"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 pt-14 pb-16 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="mono-meta mb-3">最近更新</p>
                <h2 className="serif-display text-3xl font-extrabold text-[var(--ink)]">
                  最新文章
                </h2>
              </div>
              <Link
                href="/archive"
                className="mono-meta hidden items-center gap-2 text-[var(--accent)] sm:flex"
              >
                全部归档
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="mt-8">
              {posts.slice(0, MAX_DISPLAY).map((post, index) => (
                <Link
                  key={index}
                  href={`/post/${post.slug}`}
                  className="post-row md:grid-cols-[120px_minmax(0,1fr)_86px] md:items-center"
                >
                  <div className="mono-meta mt-1 hidden md:block">{post.date.slice(0, 10)}</div>
                  <div className="min-w-0">
                    <div className="mono-meta mb-2 md:hidden">{post.date}</div>
                    <h3 className="serif-display text-xl leading-snug font-bold text-[var(--ink)] md:text-2xl">
                      {post.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--muted)]">
                      <span className="text-[var(--accent)]">{post.tags[0]}</span>
                      {post.tags.slice(1).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mono-meta hidden text-right md:block">
                    {index != null ? String(index + 1).padStart(2, '0') : '阅读'}
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/archive"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]"
            >
              浏览全部文章
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <aside className="space-y-8 lg:pt-3">
            <div>
              <p className="mono-meta mb-4">常用标签</p>
              <div className="flex flex-wrap gap-2">
                {sortedTags.map((name, index) => (
                  <Link href={name} key={index} className={`chip`}>
                    <span className="tag-dot" aria-hidden="true" />
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hairline rounded-lg border bg-[var(--panel)] p-5">
              <p className="mono-meta mb-4">站内数据</p>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dd className="serif-display text-2xl font-extrabold text-[var(--ink)]">
                    {posts.length}
                  </dd>
                  <dt className="mt-1 text-xs text-[var(--muted)]">篇文章</dt>
                </div>
                <div>
                  <dd className="serif-display text-2xl font-extrabold text-[var(--ink)]">11年</dd>
                  <dt className="mt-1 text-xs text-[var(--muted)]">写作年份</dt>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
