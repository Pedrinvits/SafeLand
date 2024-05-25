import Image from "next/image";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

export default  async function Home() {
  const session =  await auth()

    if (!session) {
        redirect('/login')
    }
  return (
    <h1>Bem Vindo de Volta, {session.user?.name}!</h1>
  );
}
