import { useRouter } from 'next/router';
import React from 'react'
import { db } from '../../firebase.js';
// import {getPostData,getAllPostData} from '../../components/lib/posts.js'
export default function Index({postData}) {
  const router = useRouter()
  return (
    <div>
      {postData.title}
    </div>
  )
}
export async function getStaticPaths(){
  //  const paths = getAllPostData()
  return{
    paths:[],
    fallback:false,
  }
}
export async function getStaticProps({params}){
  // db.collection.
  // const postData = getPostData(context.params.id)
  const post = db.collection("article").doc(params.id)
  // const postData = db.collection("article").doc(params.id)
  const { decycle } = require('json-cyclic');
  const postData = JSON.stringify(decycle(post))
  return{
    props:{
      postData
    }
  }

}