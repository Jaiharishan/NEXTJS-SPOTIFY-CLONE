import React from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';

const Song = ({track, order}) => {
    const spotifyApi = useSpotify();
    // console.log(track);
    const duration = millisToMinutesAndSeconds(track.track.duration_ms)
    // console.log(duration);

    const [currentTrack, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlayling] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlayling(true);
        spotifyApi.play({
            uris: [track.track.uri],

        })
    }


    return (
        <div className='grid grid-cols-2 px-4 py-3 hover:bg-gray-900 rounded-md cursor-pointer'
        onClick={playSong}>
            <div className='flex flex-row items-center space-x-4'>
                <p>{order}</p>
                <img src={track?.track?.album?.images[0]?.url} alt='track-image' className='w-10 h-10'/>
                <div>
                    <p className='w-36 lg:w-64 truncate hover:text-green-500'>{track?.track.name}</p>
                    <p className='w-40 text-gray-500'>{track?.track.album.artists[0].name}</p>
                </div>
                
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0 text-gray-500'>
                <p className='w-40 hidden md:inline'>{track.track.album.name}</p>
                <p>{duration}</p>
            </div>
        </div>
    )
}

export default Song
