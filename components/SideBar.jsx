import style from '../styles/Sidebar.module.css'

import { FaHome } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { BiLibrary } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { playlistIdState } from '../atoms/playlistAtom';
import { useRecoilState } from 'recoil';


export default()=>{
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylist] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState
    (playlistIdState)

  
    useEffect(() => {
      if (spotifyApi.getAccessToken()) {
        spotifyApi.getUserPlaylists().then((data) => {
          setPlaylist(data.body.items);
        });
      }
    }, [session, spotifyApi]);
    
    return(
        <>
        <p></p>
        <div className={style.container}>
            <button>
                <FaHome className={style.homeIcon}/>
                <p>Home</p>
            </button>
            <button>
                <FaPlayCircle className={style.homeIcon}/>
                <p>Minhas Playlists</p>
            </button>
            <button>
                <BiLibrary className={style.homeIcon}/>
                <p>Biblioteca</p>
            </button>
            <hr/>
            <button>
                <FaPlusCircle className={style.homeIcon}/>
                <p>Criar playlist</p>
            </button>

            {playlists.map((playlist)=>(
                <p onClick={()=>setPlaylistId(playlist.id)} key={playlist.id} className={style.playlistName}>{playlist.name}</p>
            ))}
            


            
        </div>
            
        </>
    )
}