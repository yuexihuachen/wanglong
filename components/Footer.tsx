import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="hairline mt-16 border-t bg-[var(--bg-wash)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.7fr]">
          <div>
            <p className="serif-display text-xl font-bold text-[var(--ink)]">
              在技术、代码、与阅读之间往返。
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              不积跬步，无以至千里；不积小流，无以成江海。
            </p>
          </div>
          <div>
            <p className="mono-meta mb-3">联系</p>
            <ul className="flex items-center justify-start gap-4 text-sm text-[var(--muted)]">
              <li>
                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={8} />
              </li>
              <li>
                <SocialIcon kind="github" href={siteMetadata.github} size={6} />
              </li>
            </ul>
          </div>
          <div>
            <p className="mono-meta mb-3">写给可能读到的人</p>
            <p className="text-sm leading-6 text-[var(--muted)]">
              欢迎对文章中的观点提出不同意见。好的讨论，比“说得对”更有价值。
            </p>
          </div>
        </div>
        <div className="hairline mt-8 flex flex-row gap-2 border-t pt-5 text-xs text-[var(--faint)] sm:flex-row sm:items-center sm:justify-center">
          <span>{`© 2013`}</span>
          <span>{` ~ `}</span>
          <span>{` ${new Date().getFullYear()}`}</span>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
