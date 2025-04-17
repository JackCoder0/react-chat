import './index.css'

import testingLogo from './assets/testing.svg'
import { Tech } from './Tecnologies'

const ICON_BASE_URL =
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'

const Techs = [
  {
    name: 'React',
    file: `${ICON_BASE_URL}react/react-original.svg`,
  },
  {
    name: 'Typescript',
    file: `${ICON_BASE_URL}typescript/typescript-original.svg`,
  },
  {
    name: 'Vite',
    file: `${ICON_BASE_URL}vitejs/vitejs-original.svg`,
  },
  {
    name: 'Tailwind CSS',
    file: `${ICON_BASE_URL}tailwindcss/tailwindcss-original.svg`,
  },
  {
    name: 'Vitest',
    file: `${ICON_BASE_URL}vitest/vitest-original.svg`,
  },
  {
    name: 'Testing Library',
    file: testingLogo,
  },
  {
    name: 'Storybook',
    file: `${ICON_BASE_URL}storybook/storybook-original.svg`,
  },
  {
    name: 'ESLint',
    file: `${ICON_BASE_URL}eslint/eslint-original.svg`,
  },
  {
    name: 'Prettier',
    file: 'https://www.svgrepo.com/show/354208/prettier.svg',
  },
]

export function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h6 className="text-xl font-bold">Tecnologias nesse Repositório</h6>
      {Techs.map((tech) => (
        <Tech key={tech.name} file={tech.file} name={tech.name} />
      ))}
    </div>
  )
}
