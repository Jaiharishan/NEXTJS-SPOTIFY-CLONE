import React, {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import {shuffle} from 'lodash';
import { useRecoilState } from 'recoil';
import { playlistState, playlistIdState } from '../atoms/playlistsAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';
import { signOut } from 'next-auth/react';

const colors = [
    "from-indigo-500",
    "from-green-500",
    "from-orange-500",
    "from-red-500",
    "from-blue-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]


const Center = () => {
    const {data: session} = useSession();
    const [color, setColor] = useState(null);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const spotifyApi = useSpotify();

    // console.log(session);

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId]);

    useEffect(() => {

        (async() => {
            if (spotifyApi.getAccessToken()) {
                const data = await spotifyApi.getPlaylist(playlistId);
                setPlaylist(data.body);
            }
        })()

    }, [playlist, spotifyApi])

    // console.log(playlist);

    return (
        <div className='flex text-white flex-grow flex-col overflow-y-scroll h-screen scrollbar-hide'>
            
            <header className='absolute top-4 right-4'>
                <div className='flex items-center gap-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full bg-black p-1 pr-2'
                onClick={() => signOut()}>
                    <img src={'https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg' } className='w-10 h-10 rounded-full' alt="user-image"/>
                    <h2>{session ? session.user.name : 'anonymous'}</h2>
                    <ChevronDownIcon className='h-5 w-5 hover:opacity-70' />
                </div>

            </header>

            <section className={`bg-gradient-to-b ${color} to-black w-full min-h-[350px] flex items-end`}>
                
                <img src={playlist?.images?.[0]?.url} alt='playlist-image' className='h-44 w-44 shadow-2xl pr-3' />

                <div>
                    <p>PLAYLIST</p>
                    <h2 className='text-4xl md:text-6xl xl:text-8xl font-bold'>{playlist?.name}</h2>
                </div>

            </section>

            <div>
                <Songs />
            </div>
        </div>
    )
}

export default Center
