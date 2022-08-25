import {getProviders, signIn} from 'next-auth/react'
import style from '../styles/Login.module.css'

import { FaSpotify } from "react-icons/fa";

function Login({providers}){
    return(
        <>
        <div className={style.loginContainer}>
            <h1> <span>{'<'}</span> Playerfy<span>{'/>'}</span></h1>
            {Object.values(providers).map((provider)=>(
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                        Entrar com {provider.name}
                        <FaSpotify className={style.icon}/></button>
                </div>
            ))}
        </div>
        </>
    )
}
export default Login
export async function getServerSideProps(){
    const providers = await getProviders()
    return{
        props:{
            providers
        }
    }
}