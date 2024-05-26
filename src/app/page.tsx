import Image from "next/image";
import { auth, signOut } from "../../auth";
import { redirect } from "next/navigation";

export default  async function Home() {
  const session =  await auth()

  return (
    <>
      <div>
        <pre>{JSON.stringify(session?.user,null,1)}</pre>
        
      </div>
    </>
  );
}
