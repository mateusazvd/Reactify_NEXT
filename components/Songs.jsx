import style from '../styles/Center.module.css'
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';
import {millisToMinutesAndSeconds} from '../lib/time'
import Song from './Song';
import { useState } from 'react';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import SpotifyApi from '../lib/spotify';
import useSpotify from '../hooks/useSpotify';


function Songs({order,track}) {
  const spotifyApi = useSpotify();
  const playlist = useRecoilValue(playlistState);
  const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const playSong = () => {
    setCurrentTrackId(track?.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track?.track.uri],
    }); 
  };
  return (
    <div className={style.songsArea}>
      {playlist?.tracks.items.map((track, i) => (
        <div>
        <div className={style.songArea} onClick={playSong}>
          <p>{i+1}</p>
          <img src={track.track?.album.images[0].url} className={style.imgSong} alt="" />
          <div className={style.SongName}>
            <div>
              <p>{track.track?.name}</p>
              <p className={style.artist}>{track.track?.artists[0].name}</p>
            </div>
            <div className={style.texto}>
              <p>{track.track?.album.name}</p>
              <p>{millisToMinutesAndSeconds(track.track?.duration_ms)}</p>
            </div>
          </div>
    
            
          
          
        </div>
  
      </div>
  ))}
    </div>
  );
}

export default Songs;