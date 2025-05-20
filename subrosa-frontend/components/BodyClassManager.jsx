'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function BodyClassManager() {
  const pathname = usePathname()

  useEffect(() => {
    const body = document.body
    body.classList.remove(
      'body-accueil',
      'body-contact',
      'body-artistes',
      'body-admin',
      'body-oeuvre',
      'body-login'
    )

    if (pathname === '/') {
      body.classList.add('body-accueil')
    } else if (pathname.startsWith('/contact')) {
      body.classList.add('body-contact')
    } else if (pathname.startsWith('/artistes')) {
      body.classList.add('body-artistes')
    } else if (pathname.startsWith('/admin')) {
      body.classList.add('body-admin')
    } else if (pathname.startsWith('/oeuvre')) {
      body.classList.add('body-oeuvre')
    } else if (pathname.startsWith('/login')) {
      body.classList.add('body-login')
    }
  }, [pathname])

  return null
}
