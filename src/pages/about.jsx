import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { SpotlightCard } from '@/components/SpotlightCard'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import friendsImage from '@/images/friends.jpg'
import { AnimatedTitle } from '../components/AnimatedTitle'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-pink-500 dark:text-zinc-200 dark:hover:text-pink-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-pink-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Eric Ladage</title>
        <meta name="description" content="Eric Ladage" />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="px-2.5 lg:max-w-none">
              <Image
                src={friendsImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="rotate-0 rounded-2xl bg-zinc-100 object-cover shadow-lg dark:bg-zinc-800 lg:rotate-3"
              />
            </div>
          </div>
          <div className="order-first h-full lg:order-first lg:row-span-2">
            <SpotlightCard>
              <div className="flex h-full flex-col gap-8 text-zinc-800 dark:text-zinc-100">
                <AnimatedTitle
                  title={'Eric Ladage'}
                  allowUppercase
                  textSize="4xl"
                />
                <div className="flex flex-col gap-4">
                  <p>{`Been professionally writing code since around 2015. Slowly becoming not terrible at it...`}</p>
                  <p>{`My code is being ran in hospitals all around the world. I've helped build ecommerce platforms from scratch and am currently working to build education tools for my alma mater.`}</p>
                  <p>{`Currently living in San Clemente, CA with my girlfriend and our dog, Blueberry.`}</p>
                </div>
              </div>
            </SpotlightCard>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://www.instagram.com/eladage/"
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/eladage"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/eric-ladage/"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:eladage@gmail.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                eladage@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
