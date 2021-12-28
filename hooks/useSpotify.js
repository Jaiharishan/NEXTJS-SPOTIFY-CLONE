import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react';
import spotifyApi from '../lib/spotify'

const useSpotify = () => {
    const {data: session, status} = useSession();

    useEffect(() => {

        // if in some case the refresh access token failed then we
        // manually let them sign in
        if (session) {
            if (session.error === "RefreshAccessTokenError") {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken)
        }

        
    }, [session])

    return spotifyApi;
}

export default useSpotify
