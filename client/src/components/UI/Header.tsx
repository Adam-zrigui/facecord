import React, { useCallback, useState } from 'react'
import {RiMenu3Fill} from 'react-icons/ri'
import useAuthContext from '../context/authContext'
import {BiSearch} from 'react-icons/bi'
export  function Header() {
    const AC = useAuthContext()
    const [isMenuV , setV] = useState(false)
    const onFilter = useCallback((e : React.ChangeEvent<HTMLInputElement>) =>{

    }, [])
  
    const toggleMenu = useCallback(() => {
        setV((prev) => !prev);
      }, []);
      const menuItems = [
        {
          label: "My Profile",
       //   onClick: () => openModal("profile"),
        },
        {
          label: "Add Contact",
         // onClick: () => openModal("contact"),
        },
        {
          label: "Logout",
          onClick: () => {
        //    socket.emit("logout", authContext.user?.id);
            AC.logout();
            window.localStorage.clear();
            //resetConversationState();
          },
        },
      ];
  return (
    <div>
        <div>
            <h2>Contact</h2>
                  <RiMenu3Fill onClick={toggleMenu} size={22} />
        </div>
<div>
    <BiSearch />
    <input type="text" />
</div>
    </div>
  )
}
