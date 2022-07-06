import React from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../src/auth/authProvider'
import { useRouter } from 'next/router'
import firebase from 'firebase'
export default function Header() {
  const route = useRouter()
  // const logout = (route) => {
  //   firebase.auth().signOut().then(()=>{
  //     route.push('/login')
  //     alert("ログアウトしました");
  //   })
  //   .catch( (error)=>{
  //     console.log(`ログアウト時にエラーが発生しました (${error})`);
  //   });
  // }
  const text = "text-3xl font-serif italic font-medium"
  return (
    <header>
      <div className="logo">
        <h1 className={text}>
          <Link href="/">ブログだー</Link>
        </h1>
      </div>
      <nav>
        <ul className='flex-row flex'>
          <li className='w-1/5'><Link href="/create">記事を投稿する</Link></li>
          {/* <li className='w-1/5'><button onClick={()=>logout(route)}></button>ログアウトする</li> */}
        </ul>
      </nav>
    </header>
  )
}
