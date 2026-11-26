import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
       <div className="page-enter mx-auto w-full max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
      <header className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div>
          <p className="mono-meta mb-4">ABOUT / 关于</p>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
             <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              {/* <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
              <SocialIcon kind="bluesky" href={bluesky} /> */}
            </div>
          </div>
      </div> 
        </div>

        <aside className="soft-panel hairline self-start rounded-lg p-6 lg:mt-8">
          <h2 className="serif-display mt-5 text-2xl font-extrabold text-[var(--ink)]">
            王龙
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">学不可以已</p>
          <dl className="hairline mt-5 grid gap-3 border-t pt-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="mono-meta">所在</dt>
              <dd className="text-right text-[var(--ink-soft)]">上海</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="mono-meta">开始写作</dt>
              <dd className="text-right text-[var(--ink-soft)]">2013</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="mono-meta">来信</dt>
              <dd className="truncate text-right text-[var(--ink-soft)]">
                 <SocialIcon kind="mail" href={`mailto:${email}`} />
              
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="mono-meta">代码</dt>
              <dd className="text-right text-[var(--ink-soft)]">
                <SocialIcon kind="github" href={github} />
              </dd>
            </div>
          </dl>
        </aside>
      </header>

     

      <section className="mx-auto mt-16 max-w-3xl text-center">
        <blockquote className="serif-display text-2xl font-bold leading-relaxed text-[var(--ink)]">
          “互联网很大，但一个人愿意认真写下的文字，
          <br className="hidden sm:block" />
          仍然值得占一个小地方。”
        </blockquote>
      </section>
    </div>
      {/* <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
              <SocialIcon kind="bluesky" href={bluesky} />
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">
            {children}
          </div>
        </div>
      </div> */}
    </>
  )
}
