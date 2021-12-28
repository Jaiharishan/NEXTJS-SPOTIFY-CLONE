import Siderbar from "../components/Siderbar";
import Center from "../components/Center";
import { getSession, useSession } from "next-auth/react";
import Player from "../components/Player";

export default function Home() {

  const {data : session} = useSession();
  // console.log(process.env.CLIENTID);
  // console.log(session);

  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   })();
  // }, []);

  return (
    <div className="bg-black h-screen overflow-hidden">

      <main className="flex">
        <Siderbar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>

      
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props :{
      session
    }
  }

}