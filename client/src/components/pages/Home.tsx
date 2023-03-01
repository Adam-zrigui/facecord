import React from 'react'
import useAuthContext from '../context/authContext'

export default function Home() {
const {isAuthenticated , user , jwt} = useAuthContext()

return (
    <main>
      <nav>
        
      </nav>
    </main>
  )
}
