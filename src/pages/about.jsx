import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { AnimatedTitle } from '@/components/AnimatedTitle';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Lightbox } from '@/components/Lightbox';
import { Panel } from '@/components/Panel';
import { Prompt } from '@/components/Prompt';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/SocialIcons';
import friendsImage from '@/images/friends.jpg';
import MailIcon from '@/icons/Mail';

const LINKS = [
  {
    label: 'instagram',
    value: '@eladage',
    href: 'https://www.instagram.com/eladage/',
    icon: InstagramIcon,
  },
  {
    label: 'github',
    value: 'eladage',
    href: 'https://github.com/eladage',
    icon: GitHubIcon,
  },
  {
    label: 'linkedin',
    value: 'eric-ladage',
    href: 'https://www.linkedin.com/in/eric-ladage/',
    icon: LinkedInIcon,
  },
  {
    label: 'email',
    value: 'eladage@gmail.com',
    href: 'mailto:eladage@gmail.com',
    icon: MailIcon,
  },
];

const FRIENDS_PHOTO = [{ image: friendsImage, name: 'friends.jpg' }];

export default function About() {
  let [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <Head>
        <title>About - Eric Ladage</title>
        <meta name="description" content="Eric Ladage" />
      </Head>
      <Container className="mt-12 sm:mt-20">
        <Prompt path="~/about" className="mb-10">
          cat README.md
        </Prompt>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <Panel title="README.md" className="lg:col-span-3">
            <div className="flex h-full flex-col gap-8">
              <AnimatedTitle
                title="Eric Ladage"
                allowUppercase
                showCursor
                textSize="4xl"
              />
              <div className="flex flex-col gap-4 text-sm leading-7 text-muted">
                <p>{`Been professionally writing code since around 2015. Slowly becoming not terrible at it...`}</p>
                <p>{`My code is being ran in hospitals all around the world. I've helped build ecommerce and education platforms from scratch and am currently leading a team of engineers working on the payments frontend for a banking site that gets millions of daily visits.`}</p>
                <p>{`Currently living in San Clemente, CA with my girlfriend and our dog, Blueberry.`}</p>
              </div>
              <Button href="/Resume.pdf" className="mt-4 w-full py-3">
                View Resume.pdf <span aria-hidden="true">↗</span>
              </Button>
            </div>
          </Panel>
          <div className="flex flex-col gap-12 lg:col-span-2">
            <figure>
              <button
                type="button"
                aria-label="Open friends.jpg"
                onClick={() => setOpenIndex(0)}
                className="crt block aspect-[4/3] w-full cursor-zoom-in lg:rotate-1"
              >
                <Image
                  src={friendsImage}
                  alt=""
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </button>
              <figcaption className="mt-2 text-xs text-faint">
                friends.jpg
              </figcaption>
              <Lightbox
                photos={FRIENDS_PHOTO}
                index={openIndex}
                onClose={() => setOpenIndex(null)}
                onIndexChange={setOpenIndex}
              />
            </figure>
            <Panel title="links" as="nav" aria-label="Social links">
              <ul role="list" className="space-y-3 text-sm">
                {LINKS.map(({ label, value, href, icon: Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-3 text-muted transition-colors hover:text-accent"
                    >
                      <Icon className="h-4 w-4 flex-none fill-current" />
                      <span className="w-20 flex-none text-faint group-hover:text-accent">
                        {label}
                      </span>
                      <span className="truncate text-fg group-hover:text-accent">
                        {value}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </Container>
    </>
  );
}
