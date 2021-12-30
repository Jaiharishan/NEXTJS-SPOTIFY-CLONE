import React from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSpotify from './useSpotify'
import { useState, useEffect } from 'react';



const useSongInfo = () => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);

    const [songInfo, setSongInfo] = useState(null);
    // console.log(currentTrackId);

    useEffect(() => {

        (async () => {

            if (currentTrackId) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, 
                {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }).then(res => res.json());
                
                setSongInfo(trackInfo);
            }
          
        })()

    }, [currentTrackId, spotifyApi])

    return songInfo;
}

export default useSongInfo
