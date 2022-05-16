import Link from "next/link";
import React, { useState ,useContext} from "react"
import { useRouter } from "next/router";
import { AuthContext } from "../src/auth/authProvider.js";
export default function Register() {
    const {signup}  = useContext(AuthContext);
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const route = useRouter()
    const InputName = (e) => {
        setName(e.target.value)
    }
    const InputEmail = (e) => {
        setEmail(e.target.value)
    }
    const InputPassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      signup(email,password,route)
    }

        // const auth = getAuth()
        // createUserWithEmailAndPassword(auth,email,password).then((userCredenitial)=>{
        //   const user = userCredenitial.user;
        //   route.push('/')
        // })
    const styleRoot = 'Login container md:3/5 lg:w-3/6 xl:w-2/5 ';
    const styleHeader = 'h-20 flex justify-center items-center text-3xl';
    const styleMain = 'border border-emerald-400 p-5 rounded-md';
    const styleRow = 'p-5 flex flow-root';
    const styleInputLabel = 'block pb-1 text-lg text-emerald-700';
    const styleInput = 'border rounded-md border-emerald-500 w-full p-2 text-lg text-emerald-900';
    const styleBtn = 'p-2 w-full rounded-lg bg-emerald-400 hover:opacity-80 ' +
        'text-teal-50 text-lg hover:border-emerald-500 hover:ring-2 font-black';
    return (
        <div className={styleRoot}>
            <header className={styleHeader}>
                <h1 className="text-center">会員登録</h1>
            </header>
            <main className={styleMain}>
              <form onSubmit={handleSubmit}>
                    {/* <div className={styleRow}>
                        <label htmlFor="name" className={styleInputLabel}>ユーザーネーム</label>
                        <input 
                        id="name" 
                        className={styleInput} 
                        name="name"
                        type="name" 
                        value={name} 
                        onChange={(e)=>InputName(e)}
                        autoComplete="name" 
                        required/>
                    </div> */}
                    <div className={styleRow}>
                        <label htmlFor="email" className={styleInputLabel}>メールアドレス</label>
                        <input 
                        id="email" 
                        className={styleInput} 
                        name="email"
                        type="email" 
                        value={email} 
                        onChange={(e)=>InputEmail(e)}
                        autoComplete="email" 
                        required/>
                    </div>
                    <div className={styleRow}>
                        <label 
                        htmlFor="password" 
                        className={styleInputLabel}>パスワード</label>
                        <input 
                        id="password" 
                        className={styleInput} 
                        name="password"
                        type="password" 
                        autoComplete="current-password" 
                        required 
                        value={password} 
                        onChange={(e)=>InputPassword(e)} />
                    </div>
                    <div className={styleRow}>
                        <button type="submit" className={styleBtn}>登録する</button>
                    </div>
                </form>
            </main>
        </div>
    );
}
