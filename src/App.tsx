import { doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Chat } from './components/Chat/Chat'
import { Loading } from './components/Loading'
import { Login } from './components/Login'
import { SideBar } from './components/SideBar/SideBar'
import { Test } from './components/Test'
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
      <Test setUserChat={setUserChat} userChat={userChat} />

      <SideBar setUserChat={setUserChat} userChat={userChat} />
      <Chat userChat={userChat} />
    </div>
  )
}
