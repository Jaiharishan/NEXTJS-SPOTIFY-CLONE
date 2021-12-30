import React, {useState, useEffect} from 'react'
import {HomeIcon, SearchIcon, LibraryIcon, HeartIcon, RssIcon, PlusIcon} from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistsAtom';

const Siderbar = () => {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);



    useEffect(() => {
        (async () => {
            if (spotifyApi.getAccessToken()) {
                const data = await spotifyApi.getUserPlaylists();
                setPlaylists(data.body.items);
            }
        })()
        
    },[session , spotifyApi])

    // console.log(spotifyApi);
    // console.log('playlist is', playlists);
    // console.log('you selected >>', playlistId);

    return (
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide pr-12
        sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
            <div className='space-y-4'>
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt='spotify-logo' className='py-3 w-36'/>
                <button className='flex items-center space-x-2 hover:text-white transition-colors delay-100'>
                    <HomeIcon className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white transition-colors delay-100'>
                    <SearchIcon className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white transition-colors delay-100'>
                    <LibraryIcon className='h-5 w-5' />
                    <p>Your Library</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900'></hr>

                <button className='flex items-center space-x-2 hover:text-white transition-colors delay-100'>
                    <PlusIcon className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white transition-colors delay-100'>
                    <HeartIcon className='h-5 w-5' />
                    <p>Liked songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white transition-colors delay-100'>
                    <RssIcon className='h-5 w-5' />
                    <p>Your Episodes</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900'></hr>


                {/* playlist from the sporify api */}
                {playlists.map(playlist => {
                    return <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white transition-colors delay-100'>{playlist.name}</p>
                })}
            </div>
        </div>
    )
}

export default Siderbar
