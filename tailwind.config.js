/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#5865f2',
          'primary-content': '#ffffff',
          secondary: '#4f545c',
          'secondary-content': '#dcddde',
          accent: '#ed4245',
          'accent-content': '#ffffff',
          neutral: '#2f3136',
          'neutral-content': '#dcddde',
          'base-100': '#1e2124',
          'base-200': '#2f3136',
          'base-300': '#36393f',
          'base-content': '#dcddde',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
};