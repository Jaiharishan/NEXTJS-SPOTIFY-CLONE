import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon, VolumeUpIcon, VolumeOffIcon} from '@heroicons/react/solid';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import useSpotify from '../hooks/useSpotify';


const Player = () => {
    const spotifyApi = useSpotify();
    const {data: session, state} = useSession;
    const [currentTrackId, setCurrentIdState] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                setCurrentIdState(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            }else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }

    console.log('Song ', songInfo);
    console.log(spotifyApi.getAccessToken());
    // console.log(currentTrackId);

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);

        }

    }, [spotifyApi, currentTrackIdState, session])

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume);
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(
        debounce(volume => {
            spotifyApi.setVolume(volume).catch(err => {}) 
        }, 500),
        []
    );


    return (
        <div className='text-white h-20 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 items-center text-xs md:text-base px-2 md:px-8'>
            {/* left */}

            <div className='flex items-center'>
                <div className='mr-2'>
                    <img className='hidden md:inline h-10 w-10'
                    src={songInfo?.album?.images?.[0]?.url}
                    alt="music-img" />
                </div>

                <div>
                    <h3 className="font-bold">{songInfo?.name}</h3>
                    <h3 className="text-gray-600">{songInfo?.artists?.[0]?.name}</h3>
                </div>
            </div>
            

            <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon className="w-5 h-5 cursor-pointer hover:scale-125 transform duration-100 ease-out" />
                <RewindIcon className="w-5 h-5 cursor-pointer hover:scale-125 transform duration-100 ease-out" />

                {
                    isPlaying 
                    ? (
                        <PauseIcon className='w-10 h-10 cursor-pointer hover:scale-125 transform duration-100 ease-out' onClick={handlePlayPause} />
                    )
                    : ( 
                        <PlayIcon className='w-10 h-10 cursor-pointer hover:scale-125 transform duration-100 ease-out' onClick={handlePlayPause} />
                    )
                }

                <FastForwardIcon className='w-5 h-5 cursor-pointer hover:scale-125 transform duration-100 ease-out' />
                <ReplyIcon className='w-5 h-5 cursor-pointer hover:scale-125 transform duration-100 ease-out' />

            </div>

            <div className='flex items-center space-x-3 md:space-x-4 justify-end md:pr-5'>
                <VolumeOffIcon className='w-5 h-5 cursor-pointer hover:scale-125 transform duration-100 ease-out'
                onClick={() => {volume > 0 && setVolume(volume - 10)}} />
                <input className='outline-hidden border-hidden w-14 md:w-28' type="range" value={volume} onChange={e => setVolume(e.target.value)} min={0} max={100} />
                <VolumeUpIcon className='w-5 h-5 cursor-pointer hover:scale-125 transform duration-100 ease-out'
                onClick={() => {volume < 100 && setVolume(volume + 10)}} />
                
            </div>
        </div>
    )
}

export default Player
