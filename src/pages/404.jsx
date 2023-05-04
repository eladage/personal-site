import Image from 'next/image'
import Link from 'next/link'

import blueberry_outline from '@/images/photos/blueberry-outline.png'
import { Container } from '@/components/Container'
import { AnimatedTitle } from '../components/AnimatedTitle'

export default function PageNotFound() {
  return (
    <Container className="mt-16 sm:mt-32">
      <main className="relative isolate -mb-32 flex min-h-full flex-col-reverse md:flex-row">
        <Image
          src={blueberry_outline}
          alt=""
          width={500}
          height={100}
          className=""
        />
        <div className="mx-auto  max-w-7xl px-6 py-32 text-center text-zinc-800  dark:text-zinc-200 sm:py-40 lg:px-8">
          <AnimatedTitle
            title="404"
            allowNumbers
            allowRerender={false}
            textSize="4xl"
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-400 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base text-zinc-800 dark:text-zinc-200 sm:mt-6">
            You are lost.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="text-sm font-semibold leading-7 text-zinc-800 dark:text-zinc-200"
            >
              <span aria-hidden="true">&larr;</span> Back to home
            </Link>
          </div>
        </div>
      </main>
    </Container>
  )
}
