/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        ok: 'rgb(var(--ok) / <alpha-value>)',
        warn: 'rgb(var(--warn) / <alpha-value>)',
      },
      fontFamily: {
        mono: [
          'var(--font-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
      },
    },
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    typography: (theme) => ({
      DEFAULT: {
        css: {
          '--tw-prose-body': 'rgb(var(--fg) / 0.86)',
          '--tw-prose-headings': 'rgb(var(--fg))',
          '--tw-prose-links': 'rgb(var(--accent))',
          '--tw-prose-bold': 'rgb(var(--fg))',
          '--tw-prose-counters': 'rgb(var(--faint))',
          '--tw-prose-bullets': 'rgb(var(--accent))',
          '--tw-prose-hr': 'rgb(var(--line))',
          '--tw-prose-quote-borders': 'rgb(var(--accent))',
          '--tw-prose-captions': 'rgb(var(--muted))',
          '--tw-prose-code': 'rgb(var(--fg))',
          '--tw-prose-pre-code': 'rgb(var(--fg))',
          '--tw-prose-pre-bg': 'rgb(var(--panel))',
          '--tw-prose-th-borders': 'rgb(var(--line))',
          '--tw-prose-td-borders': 'rgb(var(--line))',

          // Base
          color: 'var(--tw-prose-body)',
          fontSize: theme('fontSize.sm')[0],
          lineHeight: theme('lineHeight.7'),
          '> *': {
            marginTop: theme('spacing.8'),
            marginBottom: theme('spacing.8'),
          },
          p: {
            marginTop: theme('spacing.6'),
            marginBottom: theme('spacing.6'),
          },

          // Headings: markdown-style hash prefixes
          'h2, h3': {
            color: 'var(--tw-prose-headings)',
            fontWeight: theme('fontWeight.bold'),
          },
          'h2::before': { content: '"## "', color: 'rgb(var(--accent))' },
          'h3::before': { content: '"### "', color: 'rgb(var(--accent))' },
          h2: {
            fontSize: theme('fontSize.lg')[0],
            lineHeight: theme('lineHeight.7'),
            marginTop: theme('spacing.16'),
            marginBottom: theme('spacing.4'),
          },
          h3: {
            fontSize: theme('fontSize.base')[0],
            lineHeight: theme('lineHeight.7'),
            marginTop: theme('spacing.12'),
            marginBottom: theme('spacing.4'),
          },
          ':is(h2, h3) + *': {
            marginTop: 0,
          },

          img: {
            border: '1px solid rgb(var(--line))',
          },

          // Inline elements
          a: {
            color: 'var(--tw-prose-links)',
            fontWeight: theme('fontWeight.medium'),
            textDecoration: 'underline',
            textDecorationStyle: 'dashed',
            textUnderlineOffset: '4px',
            transitionProperty: 'color, background-color',
            transitionDuration: theme('transitionDuration.150'),
          },
          'a:hover': {
            color: 'rgb(var(--bg))',
            backgroundColor: 'rgb(var(--accent))',
            textDecoration: 'none',
          },
          strong: {
            color: 'var(--tw-prose-bold)',
            fontWeight: theme('fontWeight.bold'),
          },
          code: {
            color: 'var(--tw-prose-code)',
            fontSize: theme('fontSize.sm')[0],
            fontWeight: theme('fontWeight.medium'),
            backgroundColor: 'rgb(var(--panel))',
            border: '1px solid rgb(var(--line))',
            paddingLeft: theme('spacing.1'),
            paddingRight: theme('spacing.1'),
          },
          'code::before': { content: 'none' },
          'code::after': { content: 'none' },
          'a code': {
            color: 'inherit',
          },

          blockquote: {
            paddingLeft: theme('spacing.5'),
            borderLeftWidth: '2px',
            borderLeftColor: 'var(--tw-prose-quote-borders)',
            color: 'rgb(var(--muted))',
          },

          figcaption: {
            color: 'var(--tw-prose-captions)',
            fontSize: theme('fontSize.xs')[0],
            marginTop: theme('spacing.3'),
          },

          // Lists: dash bullets like a plain-text readme
          ul: {
            listStyleType: '"- "',
          },
          ol: {
            listStyleType: 'decimal-leading-zero',
          },
          'ul, ol': {
            paddingLeft: theme('spacing.6'),
          },
          li: {
            marginTop: theme('spacing.3'),
            marginBottom: theme('spacing.3'),
            paddingLeft: theme('spacing.1'),
          },
          'ol > li::marker': {
            color: 'var(--tw-prose-counters)',
          },
          'ul > li::marker': {
            color: 'var(--tw-prose-bullets)',
          },

          // Code blocks
          pre: {
            color: 'var(--tw-prose-pre-code)',
            fontSize: theme('fontSize.xs')[0],
            lineHeight: theme('lineHeight.6'),
            backgroundColor: 'var(--tw-prose-pre-bg)',
            border: '1px solid rgb(var(--line))',
            borderLeft: '2px solid rgb(var(--accent))',
            padding: theme('spacing.5'),
            overflowX: 'auto',
          },
          'pre code': {
            display: 'inline',
            color: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            backgroundColor: 'transparent',
            border: 0,
            padding: 0,
          },

          hr: {
            marginTop: theme('spacing.16'),
            marginBottom: theme('spacing.16'),
            borderTopWidth: '1px',
            borderStyle: 'dashed',
            borderColor: 'var(--tw-prose-hr)',
          },

          table: {
            width: '100%',
            tableLayout: 'auto',
            textAlign: 'left',
            fontSize: theme('fontSize.xs')[0],
          },
          thead: {
            borderBottomWidth: '1px',
            borderBottomColor: 'var(--tw-prose-th-borders)',
          },
          'thead th': {
            color: 'var(--tw-prose-headings)',
            fontWeight: theme('fontWeight.bold'),
            paddingBottom: theme('spacing.2'),
          },
          'tbody tr': {
            borderBottomWidth: '1px',
            borderBottomStyle: 'dashed',
            borderBottomColor: 'var(--tw-prose-td-borders)',
          },
          ':is(tbody, tfoot) td': {
            paddingTop: theme('spacing.2'),
            paddingBottom: theme('spacing.2'),
          },
        },
      },
    }),
  },
};
