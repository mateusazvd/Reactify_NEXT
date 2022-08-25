import useSpotify from "../hooks/useSpotify"

export default({order,track})=>{
  const spotifyApi = useSpotify()

  return(
    <>
      <div>
        <div>
          <p>{order+1}</p>
          <img src={track?.track.album.images[0].url} alt="" />
        </div>
      </div>
    </>
  )
}