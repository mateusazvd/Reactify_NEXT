import style from '../styles/Dsidebar.module.css'
import { signOut, useSession } from "next-auth/react";
import { BiExit } from "react-icons/bi";
import useSpotify from '../hooks/useSpotify';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import { useRecoilState} from 'recoil';
import useSongInfo from "../hooks/useSongInfo"
import { useCallback, useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { debounce } from 'lodash';



export default ()=>{
    const {data:session,status} = useSession()
    const spotifyApi = useSpotify();
    const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const songInfo = useSongInfo()
    const [volume,setVolume] = useState(50)
    const fetchCurrentSong = ()=>{
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then(data=>{
                setCurrentTrackId(data.body?.item?.id)

                spotifyApi.getMyCurrentPlaybackState().then((data)=>{
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }

    const handlePlayPause = ()=>{
        spotifyApi.getMyCurrentPlaybackState().then(data=>{
            if(data.body.is_playing){
                spotifyApi.pause()
                setIsPlaying(false)
            }else{
                spotifyApi.play()
                setIsPlaying(true)
            }
        })
    }

    useEffect(()=>{
        if(spotifyApi.getAccessToken() && !currentTrackId){
            fetchCurrentSong()
            setVolume(50)
        }

    },[currentTrackId,spotifyApi,session])

    useEffect(()=>{
        if(volume>0 && volume<100){
            debouncedAdjustVolume(volume)
        }
    },[volume])
   
    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
          spotifyApi.setVolume(volume).catch((err) => {});
        }, 300),
        []
      );
    return(
        <>
        <div className = {style.main}>
            <header>
                <p>{session?`Bem vindo,  ${session?.user.name}`:'Você não está logado :('}</p>
                <img src={session?.user.image}  alt="" />
            </header>
            <button className={style.exit}
                onClick={()=> signOut()}>
                <BiExit className={style.homeIcon}/>
                <p>Fazer loggout</p>
            </button>
            <hr />
            <div id='player'>
                <img src={songInfo?.album.images?.[0]?.url} className={style.imgPlayer} alt="" />
                <div className={style.infoPlayArea}>
                    <h3>{songInfo?.name}</h3>
                    <p>
                    {songInfo?.artists?.[0]?.name}
                    </p>
                    <div className={style.controller}>
                    <FaArrowAltCircleLeft className={style.controllerIcon}/>
                    {isPlaying?(<FaPause onClick={handlePlayPause} className={style.controllerIcon}/>):(
                    <FaPlay onClick={handlePlayPause} className={style.controllerIcon}/>)}
                    <FaArrowAltCircleRight className={style.controllerIcon}/>
                    </div>

                    <div id='volume' className={style.volumeArea}>
                        <FaPlus className={style.controllerIcon2}/>
                        <input type="range" min={0} max={100}
                        onChange={e => setVolume(Number(e.target.value))}
                        />
                        <FaMinus className={style.controllerIcon2}/>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}