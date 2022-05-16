import React,{useEffect,useState} from 'react';
import {auth, db} from '../../firebase.js'
const AuthContext = React.createContext() 

const AuthProvider = ({children}) => {
  const [currentUser,setCurrentUser] = useState(null);

  const signup = async(email,password,route,displayName) => {
    try{
      await auth.createUserWithEmailAndPassword(email,password).then(result=>{
        const user = result.user
        if(user){
          const uid =user.uid
          db.collection("users").add({
            id:uid,
            name:displayName,
            email:email,
            password:password,
          })
        }
      })
      auth.onAuthStateChanged(user=>setCurrentUser(user));
      route.push('/')
    }catch(err){
      alert(err)
    }
  }
    const login = async (email, password, route) => {
    try {
      await auth.signInWithEmailAndPassword(email,password)
      auth.onAuthStateChanged(user => setCurrentUser(user));
      route.push("/");
    } catch (error) {
      console.log(error)
      alert("ログインできませんでした。再度試してください。");
    }
  }
  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
  <AuthContext.Provider value={{currentUser,signup,login}}>
      {children}
    </AuthContext.Provider>
  ) 
  
}
export  {AuthProvider,AuthContext}