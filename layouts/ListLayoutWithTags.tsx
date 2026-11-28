'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            上一页
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            上一页
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            下一页
          </button>
        )}
        {nextPage && (
          <Link href={`${!basePath ? '/blog' : `/${basePath}`}/page/${currentPage + 1}`} rel="next">
            下一页
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  console.log(decodeURI(pathname.split('/tags/')[1]))

  return (
    <div className="page-enter mx-auto w-full max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
      <header className="hairline border-b pb-8">
        <p className="mono-meta mb-4">TAGS / 标签</p>
        <h1 className="page-title">按标签找到一篇文字</h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[var(--muted)]">
          业精于勤，荒于嬉；行成于思，毁于随。
        </p>
      </header>

      <section className="border-b border-[var(--line)] py-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="mono-meta">全部主题 · {tagCounts.length}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            key={0}
            href={`/tags/`}
            className={`chip ${'/tags/' === pathname ? 'active' : ''}`}
          >
            <span className="tag-dot" aria-hidden="true" />
            所有文章
            <span className="opacity-60">{posts.length}</span>
          </Link>
          {sortedTags.map((name, index) => (
            <Link
              key={index}
              href={`/tags/${slug(name)}`}
              className={`chip ${decodeURI(pathname.split('/tags/')[1]) === `${slug(name)}/` ? 'active' : ''}`}
            >
              <span className="tag-dot" aria-hidden="true" />
              {name}
              <span className="opacity-60">{tagCounts[name]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-10">
        <div className="mb-2 flex items-end justify-between gap-4">
          <div>
            <p className="mono-meta mb-2">FILTERED / 筛选结果</p>
            <h2 className="serif-display text-3xl font-extrabold text-[var(--ink)]">
              <>全部 {posts.length} 篇</>
            </h2>
          </div>
        </div>
        <div className="mt-8">
          {displayPosts.map((post, index) => {
            const { path, date, title, summary, tags } = post
            return (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
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
            )
          })}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </section>
    </div>
  )
}
