import React from 'react'
import { playlistState } from '../atoms/playlistsAtom';
import { useRecoilValue } from 'recoil';
import Song from './Song';

const Songs = () => {
    const playlist = useRecoilValue(playlistState);
    // console.log(playlist.tracks.items);
    return <div className='mt-5'>
        <div className='text-white flex flex-col space-y-1 pb-20'>
            {playlist?.tracks.items.map((track, index) => {
                return <Song track={track} order ={index + 1} key={track?.track.id} />
            })}
        </div>
    </div>
    
}

export default Songs
