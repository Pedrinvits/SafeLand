'use server'
import { signOut } from "../../auth"
export const SignOut = async ( ) => {
  try {
    await signOut()
}catch(error){
    throw error;
}
}