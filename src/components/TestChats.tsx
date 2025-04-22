import { collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

import { auth, db } from '@/lib/firebase'

import { SidebarChatsItem } from './SideBar/Chats/SideBarChatsItem'

interface SideBarChatsProps {
  setUserChat: (userChat: any) => void
  userChat: any
}

export function TestChats({ setUserChat, userChat }: SideBarChatsProps) {
  const [user] = useAuthState(auth)

  const refChat = query(
    collection(db, 'chats'),
    where('users', 'array-contains', user?.email),
  )

  const [chatsSnapshot] = useCollection(refChat)

  return (
    <div>
      {chatsSnapshot?.docs.map((item, index) => (
        <div
          key={index}
          className="flex items-center border-b border-[#ddd] p-2"
        >
          <SidebarChatsItem
            id={item.id}
            users={item.data().users}
            user={user}
            setUserChat={setUserChat}
            active={userChat?.chatId === item.id ? 'active' : ''}
          />
          <div />
        </div>
      ))}
    </div>
  )
}
