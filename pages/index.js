import Head from 'next/head'
import style from '../styles/Home.module.css'
import SideBar from '../components/SideBar'
import Center from '../components/Center'
import Dsidebar from '../components/Dsidebar'
import api from './api/services/api'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';


export default function Home() {
  
  

  return (
    <div>
    <Head>
      <title>Reactify</title>
    </Head>

      <div className={style.main}>
        <SideBar/>
        <Center/>
        <Dsidebar/>
        {/* player right*/}
      </div>
    </div>
  )
}
