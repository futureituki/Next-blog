import {db} from '../../firebase'



export const getArticleData = async (name) => {
  // admin から db を作成
  const ArticleCollection = db.collection('article');
  const ArticleDoc = await ArticleCollection.doc(name).get();
  if (!ArticleDoc.exists) {
    return null;
  }
  // 取得したデータを返す
  return ArticleDoc.data();
};
export async function getAllPostData(){
  let docList = [];
  await db.collection('article').get().then(snapshot=>{
    snapshot.docs.forEach(doc => {
      docList.push(doc.id) 
    });
  })
  return docList.map(doc=>{
    return{
      params:{
        id:doc.id
      }
    }
  })
}
export function getPostData(id){
  const data = db.collection("article").doc(id)
  return{
    data
  }
}