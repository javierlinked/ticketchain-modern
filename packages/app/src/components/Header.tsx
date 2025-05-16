import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_EMOJI, SITE_NAME } from '@/utils/site'
import { Connect } from './Connect'
import { NotificationsDrawer } from './NotificationsDrawer'

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
        <nav className='hidden md:flex gap-6 mr-4'>
          <LinkComponent href='/examples/tickets' className='font-medium hover:text-primary-color transition-colors'>
            Tickets
          </LinkComponent>
          <LinkComponent
            href='/examples/create-ticket'
            className='font-medium hover:text-primary-color transition-colors'>
            Create
          </LinkComponent>
        </nav>
        <Connect />
        <NotificationsDrawer />
      </div>
    </header>
  )
}
