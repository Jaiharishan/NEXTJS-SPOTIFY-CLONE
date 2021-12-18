import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, {LOGIN_URL} from '../../../lib/spotify';



// a function which checks for the refresh token if the accesstoken is expired
// AND RETURN A NEW SET OF ACCESS AND REFRESH TOKEN AS WE LOGIN AGAIN AND AGAIN
const refreshAccessToken = async (token) => {
    try{

        //  WE SET THE ACCESS AND REFRESH TOKEN
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        // THEN WE GET THE BODY OF THE RESPONSE FROM THE SPOTIFYAPI WHICH HAS THE REFRESH TOKEN
        const {body: refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log('refresh token is', refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token, // 1 hour as 3600 returned from spotify api
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
        }
    }
    catch(err) {
        console.error(err);

        return {
            ...token,
            error: "RefreshAccessTokenError"
        }

    }
}


export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            authorization: LOGIN_URL
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, account, user}){

            // if initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accountTokenExpires: account.expires_at * 1000 // 3600 seconds in milliseconds

                }
            }

            // if the user tries to login again in the 1 hr time limit then return the same token
            //  else use the refresh token to send a new token

            if (Date.now() < token.accountTokenExpires) {
                console.log('still a valid token!!')
                return token
            }

            console.log('access token is expired!')
            return await refreshAccessToken(token.refreshToken);

        },

        async session({session, token}) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session
        }
    }
})