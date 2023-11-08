/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "false",
  corePlugins: {
    preflight: false,
  },
  content: [
    "./node_modules/flowbite/**/*.js",
    "./public/index.html",
    '.src/**/*.jsx',
    "./src/**/*.{html,js,jsx}",
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  important: '#root',
  theme: {
    extend: {},
  },
  plugins: [
    'flowbite/plugin',
    "tw-elements/dist/plugin",
  ],
  important: true,
}

