import React from 'react'
import logo from './logo.svg'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'
import './PageShell.scss'
import { Link } from './Link'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export { PageShell }
const client = new QueryClient()
function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <QueryClientProvider client={client} >
        <Content>{children}</Content>
        <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </PageContextProvider>
    </React.StrictMode>
  )
}
function Content({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}

