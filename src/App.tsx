import { doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Chat } from './components/Chat/Chat'
import { Loading } from './components/Loading'
import { Login } from './components/Login'
import { SideBar } from './components/SideBar/SideBar'
import { auth, db } from './lib/firebase'

export function App() {
  const [user, loading] = useAuthState(auth)
  const [userChat, setUserChat] = useState(null)

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      setDoc(userRef, {
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName,
      })
    }
  }, [user])

  if (loading) return <Loading />

  if (!user) return <Login />

  return (
    <div className="flex h-screen w-full">
      {/* <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-4xl font-bold uppercase">Tela Principal</h1>
      </div> */}
      <SideBar setUserChat={setUserChat} userChat={userChat} />
      <Chat userChat={userChat} />
    </div>
  )
}
