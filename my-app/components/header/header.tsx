import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <nav>
        <ul className='flex-row flex'>
          <li className='w-1/5'><Link href="/create">記事を投稿する</Link></li>
          <li className='w-1/5'><Link href="/logout">ログアウトする</Link></li>
        </ul>
      </nav>
    </header>
  )
}
