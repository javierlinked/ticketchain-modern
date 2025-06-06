import React from 'react'
import { LinkComponent } from './link-component'
import { SITE_EMOJI, SITE_NAME } from '@/utils/site'
import { Connect } from './connect'

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur navbar flex justify-between p-4 shadow-sm'>
      <LinkComponent href='/' className='flex items-center gap-2 transition-transform hover:scale-105'>
        <h1 className='text-2xl font-bold'>
          <span className='mr-2'>{SITE_EMOJI}</span>
          <span className='hidden sm:inline text-gradient'>{SITE_NAME}</span>
        </h1>
      </LinkComponent>

      <div className='flex items-center gap-3'>
        <Connect />
      </div>
    </header>
  )
}
