import Head from 'next/head';
import Image from 'next/image';

import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import { Button } from '@/components/Button';
import RESUME from '@/constants/RESUME';

function formatMonth(date) {
  return date
    .toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
    .toLowerCase();
}

function Job({ job }) {
  return (
    <li className="border border-line bg-bg/80">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-dashed border-line px-5 py-3">
        {job.logo && (
          <div className="flex h-9 w-9 flex-none items-center justify-center border border-line bg-white p-1">
            <Image
              src={job.logo}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
        )}
        <div className="min-w-0 flex-auto">
          <h3 className="text-sm font-bold text-fg">
            {job.company}
            {job.current && (
              <span className="ml-2 font-normal text-ok">(HEAD)</span>
            )}
          </h3>
          <p className="text-xs text-accent">{job.title}</p>
        </div>
        <p className="text-xs text-warn">
          {formatMonth(job.start)}
          <span className="text-faint"> → </span>
          {job.current ? 'present' : formatMonth(job.end)}
        </p>
      </div>
      <ul className="space-y-2 px-5 py-4 text-xs leading-6 text-muted">
        {job.description}
      </ul>
    </li>
  );
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Eric Ladage</title>
        <meta name="description" content="Work" />
      </Head>

      <SimpleLayout
        command="cat experience.md"
        title="Professional Experience"
        intro="Experienced software engineer in industries from healthcare to ecommerce to education to finance."
        titleAction={
          <Button href="/Resume.pdf" variant="secondary">
            Resume.pdf
            <span aria-hidden="true" className="text-accent">
              ↓
            </span>
          </Button>
        }
      >
        <div className="space-y-16">
          <Section title="work">
            <ol className="space-y-6 [&_ul>li]:relative [&_ul>li]:pl-4 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:text-accent [&_ul>li]:before:content-['-']">
              {RESUME.map((job, i) => (
                <Job key={i} job={job} />
              ))}
            </ol>
          </Section>
        </div>
      </SimpleLayout>
    </>
  );
}
