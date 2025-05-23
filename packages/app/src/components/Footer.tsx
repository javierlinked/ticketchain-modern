import React from 'react'
import { SITE_EMOJI, SITE_INFO, SITE_NAME, SOCIAL_GITHUB, SOCIAL_TWITTER } from '@/utils/site'
import { NetworkStatus } from './network-status'

export function Footer() {
  return (
    <footer className='w-full bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-2'>
      <div className='flex justify-between items-center text-sm text-slate-500 px-4'>
        <span className='text-center flex-1'>
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </span>
        <NetworkStatus />
      </div>
    </footer>
  )
}
