import Head from 'next/head'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import deskImage from '@/images/desk.jpg'
import kbImage from '@/images/kb.jpg'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-4">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Eric Ladage</title>
        <meta name="description" content="My desk" />
      </Head>
      <SimpleLayout title="My Desk">
        <div className="m-auto mb-16 flex aspect-[21/7] flex-none items-center overflow-hidden rounded-xl bg-zinc-100">
          <Image src={kbImage} alt="My desk" />
        </div>
        <div className="space-y-10">
          <ToolsSection title="Workstation">
            <Tool title="Mac Studio ULTRA">
              The ULTRA branding apparently worked on me...
            </Tool>
            <Tool title="GMMK Pro Keyboard">It’s got a little knob on it.</Tool>
            <Tool title="Apple Magic Trackpad">
              Probably giving me carpal tunnel but hey I can never go back.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Languages*">
            <Tool title="Typescript">
              Some people hate it but I love it. I am one of the few people that
              think that javascript when written well is a pretty language and
              with static typing it eliminates most of my negatives. I also love
              being able to keep my backend and frontend language the same. It
              makes moving over schema to typing so simple and without the added
              context switching.
            </Tool>
            <Tool title="Tailwind CSS">
              Somewhat new to this train. This site is built around it and it
              just makes me so much faster. I still think there are some real
              drawbacks vs. using a robust sass solution but I just can no
              longer ignore the added speed of development.{' '}
              <i>I do hate looking at all the classes on the dom though...</i>{' '}
            </Tool>
            <Tool title="NextJS + Vercel">
              They are <del>going to take</del> taking over the world
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
            <Tool title="Fantastical">
              Calendar app that helps me not <i>always</i> be late.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Physical Tools">
            <Tool title="Tactile Turn Bolt-Action Pen">
              This is so extra but I love it.
            </Tool>
            <Tool title="Sennheiser HD800S Headphones">
              End game headphones. I’m not sure I’ll ever upgrade.
            </Tool>
            <Tool title="Blue Light Glasses">
              Do these actually work? I’m too deep to really question the
              placebo
            </Tool>
          </ToolsSection>
          <ToolsSection title="Music Gear">
            <Tool title="Output Frontier Studio Monitors (Barefoot Audio)">
              Big bois with big sound, plus they look cool.
            </Tool>
            <Tool title="Fender Accoustasonic Jazzmaster">
              Great all around guitar. Not the best at anything but good at
              everything.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Bikes">
            <Tool title="Specialized Tarmac SL5">
              Carbon. Ultegra. Disc brakes. 🤤
            </Tool>
            <Tool title="Santa Cruz Chameleon">
              I’m the only one in Utah on a hardtail it seems. One day I’ll get
              that full squish goodness.
            </Tool>
          </ToolsSection>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          * not all are languages but I don’t know what else to call this bucket
          ok
        </p>
      </SimpleLayout>
    </>
  )
}
