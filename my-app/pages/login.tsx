import Link from "next/link";
import React, { useState ,useContext} from "react"
import { useRouter } from "next/router";
import { AuthContext } from "../src/auth/authProvider.js";
const Login = () => {
    const {login}  = useContext(AuthContext);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const route = useRouter()
    const InputEmail = (e) => {
        setEmail(e.target.value)
    }
    const InputPassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email,password,route)
        }
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
                <h1 className="text-center">ログイン画面</h1>
            </header>
            <main className={styleMain}>
                <form action="#" method="POST" onSubmit={(e)=>handleSubmit(e)} >
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
                        <div>
                            <a href="#">パスワードを忘れた方</a>
                        </div>
                    </div>
                    <div className={styleRow}>
                        <div>
                            <Link href="/register">会員がまだの人はこちら</Link>
                        </div>
                    </div>
                    <div className={styleRow}>
                        <button type="submit" className={styleBtn}>ログイン</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Login;