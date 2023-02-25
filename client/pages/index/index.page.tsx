import React from 'react'
import { Counter } from './Counter'
import { resolveRoute  } from 'vite-plugin-ssr/routing'

export default async (pageContext : any) => {
  // Ensure that `/product/@id/edit` can be accessed only by admins
  if (!pageContext.user.isAdmin) {
    return false
  }

  // We can use vite-plugin-ssr's Route String resolver
  return resolveRoute('/product/@id/edit', pageContext.urlPathname)
}
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
