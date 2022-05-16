import type {NextApiRequest,NextApiResponse} from "next"
const {cert} = require('firebase-admin/app')
const {getFirestore}=require("firebase-admin/firestore")
const serviceAccount = require('../../firebase-test-serviceAccount.json');
const admin = require('firebase-admin');

export default async function handler(
  req:NextApiRequest,
  res:NextApiResponse,
){
    const COLLECTION_NAME = "article"
    if(admin.apps.length===0){
      admin.initializeApp({
        credential:cert(serviceAccount),
      });
    }
    const db = getFirestore();

    if(req.method==="POST"){
      const docRef = db.collection(COLLECTION_NAME).doc();
      const insertData = {
        id:docRef.id,
        title:req.body.title,
        content:req.body.content
      }
      docRef.set(insertData);
    }
    res.status(200);
}