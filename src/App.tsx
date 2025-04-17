import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Loading } from './components/Loading'
import { Login } from './components/Login'
import { SideBar } from './components/SideBar'
import { auth, db } from './lib/firebase'

export function App() {
  const [user, loading] = useAuthState(auth)
  const [userChat, setUserChat] = useState(null)

  useEffect(() => {
    if (user) {
      db.collection('users').doc(user.uid).set({
        email: user.email,
        photoURL: user.photoURL,
      })
    }
  }, [user])

  if (loading) return <Loading />

  if (!user) return <Login />

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <SideBar />
    </div>
  )
}
