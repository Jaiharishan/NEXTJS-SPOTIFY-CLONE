import React from 'react'
import {HomeIcon, SearchIcon, LibraryIcon, HeartIcon, RssIcon, PlusIcon} from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
const Siderbar = () => {

    const {data: session, status} = useSession();

    console.log(session);

    return (
        <div className='text-gray-500 p-5 text-sm border-r border-gray-900'>
            <div className='space-y-4'>
                <button className='flex items-center space-x-2 hover:text-white'
                onClick={() => signOut({callbackUrl: 'http://localhost:3000/login'})}>
                    <HomeIcon className='h-5 w-5' />
                    <p>Logout</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5' />
                    <p>Your Library</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900'></hr>

                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusIcon className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5' />
                    <p>Your Episodes</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5' />
                    <p>Your Episodes</p>
                </button>

                <hr className='border-t-[0.1px] border-gray-900'></hr>

                <p className='cursor hover:text-white'>Playlist name..</p>
                <p className='cursor hover:text-white'>Playlist name..</p>
                <p className='cursor hover:text-white'>Playlist name..</p>
                <p className='cursor hover:text-white'>Playlist name..</p>
                <p className='cursor hover:text-white'>Playlist name..</p>
                {/* playlist from the sporify api */}
            </div>
        </div>
    )
}

export default Siderbar
