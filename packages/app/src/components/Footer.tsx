import React from 'react'
import { SITE_EMOJI, SITE_INFO, SITE_NAME, SOCIAL_GITHUB, SOCIAL_TWITTER } from '@/utils/site'
import { NetworkStatus } from './network-status'

export function Footer() {
  return (
    <>
      <div className='container-responsive flex justify-end mb-4'>
        <NetworkStatus />
      </div>

      <footer className='sticky top-[100vh] w-full bg-white dark:bg-slate-800 shadow-lg border-t border-slate-200 dark:border-slate-700'>
        <div className='container-responsive py-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='flex flex-col'>
              <h3 className='text-lg font-bold mb-2 flex items-center'>
                <span className='mr-2'>{SITE_EMOJI}</span>
                {SITE_NAME}
              </h3>
              <p className='text-sm text-slate-600 dark:text-slate-300'>{SITE_INFO}</p>
            </div>
          </div>
          <div className='mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-500'>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
