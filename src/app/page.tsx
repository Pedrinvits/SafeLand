import Image from "next/image";
import { auth, signOut } from "../../auth";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CreatePost from "@/components/CreatePost";
import ShowPosts from "@/components/ShowPosts";

export default  async function Home() {
  const session =  await auth()

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-6 py-12 md:py-16">
      <ShowPosts/>
      {/* <CreatePost/> */}
      </div>
    </>
  );
}
