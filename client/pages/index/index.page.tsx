import React from 'react'
import { Counter } from './Counter'
import { resolveRoute  } from 'vite-plugin-ssr/routing'


  // We can use vite-plugin-ssr's Route String reso
export { Page }

function Page() {
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  )
}
