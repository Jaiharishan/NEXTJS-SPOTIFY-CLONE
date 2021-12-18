import React from 'react';
import { useState, useEffect } from 'react';
import {signIn} from 'next-auth/react';
import {getProviders} from 'next-auth/react';


function Login () {

    const [providers, setProviders] = useState({});

    useEffect(() => {
      (async () => {
        const res = await getProviders();
        setProviders(res);
      })();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-full bg-black'>
            <img className='w-52 mb-5 mt-5' src="https://links.papareact.com/9xl" alt="spotify" />

            {Object.values(providers).map(provider => {
                return <div key={provider.name}>
                    <button
                    className="bg-[#18D860] text-white rounded-full px-5 py-3" 
                    onClick={() => signIn('spotify', {callbackUrl: '/'})}
                    >
                        login with {provider.name}
                    </button>
                </div>
            })}
        </div>
    )
}

export default Login;

// export async function getServerSideProps() {
//     const providers = await getProviders();

//     return {
//         props: {providers}
//     }
// }


