import style from '../styles/Center.module.css'
import { FaSearch } from "react-icons/fa";
import { ChevronDownIcon, LogoutIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { shuffle } from 'lodash';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import { signOut } from 'next-auth/react';
import Songs from './Songs';
export default()=>{

    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const [isActive, setActive] = useState('false');


    useEffect(() => {
        spotifyApi
          .getPlaylist(playlistId)
          .then((data) => {
            setPlaylist(data.body);
          })
          .catch((err) => console.log('Something went wrong!', err));
      }, [spotifyApi, playlistId]);
    
      const handleToggle = () => {
        setActive(!isActive);
      };
    return(
        <>
        <div className={style.center}>
          <header className={style.header}>
              <FaSearch className={style.icon}/>
              <input type="text" placeholder='Pesquisar...'/>
          </header>
          <hr className={style.divisorNav}/>

          <div className={style.playlistInfo}>
            <img className={style.imgPlaylisy} src={playlist?.images[0]?.url} alt="" />
            <div className={style.playlistInfoTitle}>
              <h2>{playlist?.name}</h2>
              <p className={style.description}>{playlist?.description}</p>
              <p className={style.followers} >{playlist?.followers.total} Pessoas seguindo</p>
            </div>
          </div>
          <Songs/>

        </div>
        
        </>
    )
}