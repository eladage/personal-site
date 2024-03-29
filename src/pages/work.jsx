import Head from 'next/head';
import Image from 'next/image';

import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import { Button } from '@/components/Button';
import ArrowDownIcon from '@/icons/ArrowDown';
import kbImage from '@/images/kb.jpg';
import RESUME from '@/constants/RESUME';

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-4">
        {children}
      </ul>
    </Section>
  );
}

function Tool({
  title,
  secondary,
  image,
  subtitle,
  href,
  descriptionElement,
  children,
}) {
  return (
    <Card as="li">
      <div className="flex w-full items-center gap-4">
        {image && <Image src={image} alt={title} className="h-12 w-12" />}
        <div className="w-full">
          <Card.Title as="h3" href={href} secondary={secondary}>
            {title}
          </Card.Title>
          <Card.Subtitle>{subtitle}</Card.Subtitle>
        </div>
      </div>
      <Card.Description as={descriptionElement}>{children}</Card.Description>
    </Card>
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
        title="Professional Experience"
        intro="Developed software professionally in industries from healthcare to ecommerce to education."
        titleAction={
          <Button href={'/Resume.pdf'} variant="secondary">
            Resume.pdf
            <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />{' '}
          </Button>
        }
      >
        <div className="space-y-10">
          <ToolsSection title="Work">
            {RESUME.map((job, i) => (
              <Tool
                key={i}
                title={job.company}
                secondary={
                  job.start.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  }) +
                  ' - ' +
                  job.end.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })
                }
                image={job.logo}
                subtitle={job.title}
                descriptionElement="ul"
              >
                {job.description}
              </Tool>
            ))}
          </ToolsSection>
          <ToolsSection title="Languages" subtitle="what I'm currently using">
            <Tool title="Typescript">
              Been using typescript for around 3 years now, love the type safety
              it provides and the intellisense in vscode is a cherry on top.
            </Tool>
            <Tool title="React">
              Started with React in 2018 working for Cerner and have used it in
              every job since. Simple, easy to understand and the documentation
              and support is great.
            </Tool>
            <Tool title="Node.js" />
            <Tool title="AWS" />
            <Tool title="GraphQL" />
            <Tool title="Postgres">
              Simple relational databases are still cool.
            </Tool>

            <Tool title="Tailwind CSS">
              {`Understandably divisive but really helps me build fast and
              eventually the long classnames become legible and it's nice to
              just have them in the same file instead of switching back and
              forth between css and your js components.`}
            </Tool>
            <Tool title="Rust">
              Spending some down time learning Rust to see what all the hype is
              about.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="VSCode">I’m basic.</Tool>
            <Tool title="Warp">
              Terminal with extra bells/whistles. Written in Rust™
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Raycast">
              Spotlight with extra bells/whistles. Also written in Rust™
            </Tool>
            <Tool title="Karabiner">Custom key shortcuts.</Tool>
            <Tool title="Notion">Notes.</Tool>
          </ToolsSection>
        </div>

        <div className="mt-16 flex aspect-[21/7] flex-none items-center overflow-hidden rounded-xl bg-zinc-100">
          <Image src={kbImage} alt="My desk" />
        </div>
      </SimpleLayout>
    </>
  );
}
