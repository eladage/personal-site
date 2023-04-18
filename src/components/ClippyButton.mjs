import React, { useState, useEffect } from 'react'

// this is quite possibly the worst code I've ever written... so far...

export default function ClippyButton({ title }) {
  const [showClippy, setShowClippy] = useState(false)
  const [agent, setAgent] = useState(null)

  useEffect(() => {
    if (showClippy) {
      import('clippyts').then(({ default: clippyModule }) => {
        clippyModule.load({
          name: 'Clippy',
          successCb: (agent) => {
            const clippyElement = document.querySelector('.clippy')
            const clippySpeechBubble = document.querySelector('.clippy-balloon')

            // remove ability to move clippy
            clippyElement.style.pointerEvents = 'none'

            agent.show()
            setAgent(agent)

            setTimeout(() => {
              agent.animate()
            }, 2000)
          },
          failCb: (e) => {
            console.error(e)
          },
        })
      })
    }

    return () => {
      if (agent) {
        agent.hide()
        agent.stop()
      }
    }
  }, [showClippy])

  return (
    <>
      <button
        className="w-full text-right text-sm text-zinc-800 dark:text-zinc-200"
        onClick={() => setShowClippy(!showClippy)}
      >
        {`📎 ${title} `}
        <span className="tracking-wid inline-block rounded-full border border-yellow-200 px-2 text-xs font-semibold uppercase">
          BETA
        </span>
      </button>
    </>
  )
}
