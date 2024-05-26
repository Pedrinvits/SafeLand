'use client'

import { SignOut } from "@/action/SignOut";

const ButtonS = () => {
    const handleLogoutClick = async () => {
        await SignOut();
      };
    return ( 
        <button onClick={handleLogoutClick}>Sair</button>
     );
}
 
export default ButtonS;