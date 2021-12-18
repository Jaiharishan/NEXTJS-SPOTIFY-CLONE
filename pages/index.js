import Siderbar from "../components/Siderbar";


export default function Home() {

  console.log(process.env.CLIENTID);
  return (
    <div className="bg-black h-screen overflow-hidden">

      <main>
        <Siderbar />
        {/* center */}
      </main>

      {/* music player div */}
    </div>

      
  )
}
