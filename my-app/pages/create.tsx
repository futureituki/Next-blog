import React, { useState,useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import format from 'date-fns/format'
import {db} from '../firebase'
import { AuthContext } from "../src/auth/authProvider.js";

export default function Create() {
  const area = "sm:col-span-2"
  const label = "block text-gray-800 text-sm sm:text-base"
  const smallInput = "w-9/12 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
  const bigInput = "w-9/12 h-64 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"

  const {currentUser}  = useContext(AuthContext);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const route = useRouter();
  const  registerPost = async (e) => {
    e.preventDefault();
    const now =firebase.firestore.Timestamp.now().toDate()
    const collection = db.collection('article')
    const newDoc = collection.doc().id
        collection.doc(newDoc).set({
        id:newDoc,
        user_id:currentUser.uid,
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
      <form action="" method="post" onSubmit={(e)=>AddPosts(e)}>
        <div className={area}>
        <label className={label}>Title*</label>
        <input 
        name='title'
        className={smallInput}
        id='title'
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
        />
        </div>
        <div className={area}>
          <label className={label}>Message*</label>
          <textarea 
          className={bigInput}
          name="content" 
          id="content" 
          onChange={(e)=>setContent(e.target.value)}
          value={content}
          >
          </textarea>
        </div>
        <input type="submit" value="記事を投稿する"/>
      </form>
    </div>
  )
}
