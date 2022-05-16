import { useRouter } from 'next/router';
import { useEffect, useState ,useContext} from 'react';
import {db} from '../firebase.js';
import { format } from 'date-fns';
import { AuthContext } from "../src/auth/authProvider.js";
export default function Home() {
  const {currentUser}  = useContext(AuthContext);
  const route = useRouter()
  const [article,setArticle] = useState([])
  useEffect(()=>{
    if(currentUser===null){
      route.push('/login')
    }else{
      db.collection("article")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
          setArticle(snapshot.docs.map((doc) => doc.data()));
        });
    }
  },[])
 
     // const route = useRouter()
  // const insertUser = async () => {
  //   route.push('/login');
  //   await axios.post('/api/user');
  // }
  const container = 'max-w-sm rounded overflow-hidden shadow-lg'
  const content = 'px-6 py-4'
  const title = "font-bold text-xl mb-2"
  const body = "text-gray-700 text-base"
  const date = "px-6 pt-4 pb-2"
  const span = "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
  return( 
    <>
    {article.map((data,i)=>(
        <div className={container}>
      <div className={content} key={i}>
        <div className={title}>
            <h2>{data.title}</h2>
        </div>
        <div className={body}>
            <p>{data.content}</p>
        </div>
        <div className={date}>
          <span className={span}>{format(data.createdAt.seconds * 1000, 'yyyyMMddHH')}</span>
        </div>
      </div>
    </div>
      ))}
    </>
  )
}
