import React, { PropsWithChildren } from 'react'
import { Header } from './header'
import { Footer } from './footer'

export function Layout(props: PropsWithChildren) {
  return (
    <div className='min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900'>
      <Header />
      <main className='flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        <div className='w-full'>{props.children}</div>
      </main>
      <Footer />
    </div>
  )
}
