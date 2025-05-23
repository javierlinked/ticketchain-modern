import React from 'react'
import { SITE_EMOJI, SITE_INFO, SITE_NAME, SOCIAL_GITHUB, SOCIAL_TWITTER } from '@/utils/site'
import { NetworkStatus } from './network-status'

export function Footer() {
  return (
    <footer className='w-full bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='relative flex items-center justify-center text-sm text-slate-500'>
          <span>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </span>
          <div className='absolute right-0'>
            <NetworkStatus />
          </div>
        </div>
      </div>
    </footer>
  )
}
