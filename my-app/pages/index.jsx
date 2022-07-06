import { useRouter } from 'next/router';
import { useEffect, useState ,useContext} from 'react';
import Link from 'next/link';

import {db} from '../firebase/firebase.js';

import { format } from 'date-fns';

import { AuthContext } from "../src/auth/authProvider.js";

export default function Home() {
  const {currentUser}  = useContext(AuthContext);
  const route = useRouter()
  const [article,setArticle] = useState([])
  const [user,setUser] = useState([])
  const DeleteArticle = async(id) => {
      db.collection('article').doc(id).delete();
  }
  let docList = []
  useEffect(()=>{
    if(currentUser===null){
      route.push('/login')
    }else{
      db.collection("users").where('id', '==', currentUser.uid).onSnapshot(snapshot=>{
        setUser(snapshot.docs.map(doc=>doc.data()))
      })
       db.collection('article').get().then(snapshot=>{
        snapshot.docs.forEach(doc => {
          docList.push({key:doc.id})
        });
      })
      db.collection("article").where('user_id', '==', currentUser.uid)
      .orderBy("createdAt","desc")
      .limit(20)
      .onSnapshot((snapshot) => {
        const articles = []
        snapshot.forEach(doc => articles.push({...doc.data()}));
          setArticle(articles);
        });
    }
  },[])
  const container = 'w-full rounded overflow-hidden shadow-lg m-5'
  const content = 'w-full px-6 py-4'
  const title = "font-bold text-xl mb-2"
  const body = "text-gray-700 text-base"
  const date = "px-6 pt-4 pb-2"
  const span = "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
  return( 
    <>
    <h2>{user.map(data=>data.name)}さんこんにちは</h2>
    {article.map((data)=>(
      <Link href={`posts/${data.id}`} key={data.id}>
        <a href="">
      <div className={container}>
      <div className={content}>
        <div className={title}>
            <h2>{data.title}</h2>
        </div>
        <div className={body}>
        <p> {data.content.length > 50 ? data.content.slice(1,150)+"...." : data.content }</p>
        </div>
        <div className={date}>
          <span className={span}>{format(data.createdAt.seconds * 1000, 'yyyyMMddHH')}</span>
        <button className={span} onClick={()=>DeleteArticle(data.id)}>削除します</button>
        </div>
      </div>
    </div>
   </a>
      </Link>
      ))}
    </>
  )
}
