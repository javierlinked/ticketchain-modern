import React, { PropsWithChildren } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout(props: PropsWithChildren) {
  return (
    <div className='flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900'>
      <Header />

      <main className='grow px-4 sm:px-6 lg:px-8 container max-w-4xl mx-auto py-6 sm:py-8 md:py-10'>
        <div className='card-modern p-6 sm:p-8 mb-6'>{props.children}</div>
      </main>
      <Footer />
    </div>
  )
}
