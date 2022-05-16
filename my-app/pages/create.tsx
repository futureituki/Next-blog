import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import { format } from 'date-fns'
import {db} from '../firebase'


export default function Create() {
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const route = useRouter();
  const  registerPost = async (e) => {
    e.preventDefault();
    const now =firebase.firestore.Timestamp.now().toDate()
    const myShaped = format(now, 'yyyyMMddHHmmss');
    db.collection("article").add({
        id:myShaped,
        title: title,
        content: content,
        createdAt:now
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}
  const AddPosts = (e) => {
    registerPost(e);
    route.push('/')
  }
  return (
    <div>
      <form action="" method="post">
        <input 
        name='title'
        id='title'
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
        />
        <textarea 
        name="content" 
        id="content" 
        cols={30} 
        rows={10} 
        onChange={(e)=>setContent(e.target.value)}
        value={content}
        />
        <input type="submit" value="記事を投稿する" onClick={(e)=>AddPosts(e)}/>
      </form>
    </div>
  )
}
