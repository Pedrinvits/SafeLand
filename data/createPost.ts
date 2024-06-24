"use server"
import { db } from "@/lib/db";
import { auth } from "../auth";
import { getUserByEmail } from "./user";

type Post  = {
    title : String,
    description : String,
    authorId ?: String | Number,
}
export const createPosts = async (title, description : Post)  => {
    const session =  await auth()
    const authorId = session?.user?.user?.email
    const  user = await getUserByEmail(authorId);
    console.log(user?.id);
    
  try {
    const post = await db.post.create({
      data : {
        description : description,
        title : title,
        authorId : user?.id,
        // id : '4',
      }
    });
    // console.log(post);

    return { sucess : "Post Created!", error : null};
  } catch (error) {
    console.log(error);
    
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true,
        // comments: true,
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
    
  }
};
