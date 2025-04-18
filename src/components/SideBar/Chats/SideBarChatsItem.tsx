import { collection, query, where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { MdPerson } from 'react-icons/md'

import { db } from '@/lib/firebase'

interface SidebarChatsItemProps {
  id: string
  users: string[]
  user: any
  setUserChat: (userChat: any) => void
  active: string
}

export function SidebarChatsItem({
  id,
  users,
  user,
  setUserChat,
  active,
}: SidebarChatsItemProps) {
  const getUser = (
    users: string[],
    userLogged: { email: string | null },
  ): string | undefined =>
    users?.filter((user: string) => user !== userLogged?.email)[0]

  const userEmail = getUser(users, user)

  const userQuery =
    userEmail && query(collection(db, 'users'), where('email', '==', userEmail))

  const [getUserItem] = useCollection(userQuery || undefined)

  const Avatar = getUserItem?.docs?.[0]?.data()
  // const item = getUser(users, user)

  const handleNewChat = () => {
    const userChat = {
      chatId: id,
      name: Avatar?.displayName || userEmail,
      photoURL: Avatar?.photoURL,
    }

    setUserChat(userChat)
  }

  return (
    <div
      className={`flex cursor-pointer items-center justify-start gap-2 rounded-md px-5 py-4 ${active}`}
      onClick={handleNewChat}
    >
      {Avatar ? (
        <img
          className="h-9 w-9 cursor-pointer rounded-full"
          src={Avatar?.photoURL || undefined}
          alt="user photo"
        />
      ) : (
        <MdPerson />
      )}
      <span className="text-sm font-medium">{Avatar?.displayName}</span>
    </div>
  )
}
