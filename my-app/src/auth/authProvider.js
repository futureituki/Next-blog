import React,{useEffect,useState} from 'react';
import {auth} from '../../firebase.js'

const AuthContext = React.createContext() 

const AuthProvider = ({children}) => {
  const [currentUser,setCurrentUser] = useState(null);

  const signup = async(email,password,route) => {
    try{
      await auth.createUserWithEmailAndPassword(email,password);
      auth.onAuthStateChanged(user=>setCurrentUser(user));
      route.push('/')
    }catch(err){
      alert(err)
    }
  }
  const login = async (email, password, route) => {
    try {
      await auth.signInWithEmailAndPassword(email,password);
      auth.onAuthStateChanged(user => setCurrentUser(user));
      route.push("/");
    } catch (error) {
      alert(error);
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