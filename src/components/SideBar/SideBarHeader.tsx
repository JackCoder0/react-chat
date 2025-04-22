import * as EmailValidator from 'email-validator'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { MdChat, MdDonutLarge, MdMoreVert } from 'react-icons/md'

import { auth, db } from '@/lib/firebase'

import { AvatarPhoto } from '../Avatar'

interface SideBarHeaderProps {
  setUserChat: (userChat: any) => void
}

export function SideBarHeader({ setUserChat }: SideBarHeaderProps) {
  const [user] = useAuthState(auth)

  const refChat = query(
    collection(db, 'chats'),
    where('users', 'array-contains', user?.email),
  )

  const [chatsSnapshot] = useCollection(refChat)

  const chatExists = (emailChat: any) => {
    return !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: any) => user === emailChat)?.length > 0,
    )
  }

  const handleCreateChat = () => {
    const emailInput = prompt('Escreva o e-mail desejado')

    if (!emailInput) return

    if (!EmailValidator.validate(emailInput)) {
      return alert('E-mail inválido!')
    } else if (emailInput === user?.email) {
      return alert('Insira um e-mail diferente do seu!')
    } else if (chatExists(emailInput)) {
      return alert('Chat já existe!')
    }

    addDoc(collection(db, 'chats'), {
      users: [user?.email, emailInput],
    })
  }

  return (
    <div className="mb-1.5 flex h-14 items-center justify-between bg-[#f0f2f5] px-4 py-2.5">
      <div className="flex items-center gap-2.5">
        <AvatarPhoto
          src={user?.photoURL || ''}
          onClick={() => [auth.signOut(), setUserChat(null)]}
        />

        <p>{user?.displayName}</p>
      </div>
      <div className="flex gap-2.5">
        <MdDonutLarge size={24} className="cursor-pointer" />
        <MdChat
          size={24}
          className="cursor-pointer"
          onClick={handleCreateChat}
        />
        <MdMoreVert size={24} className="cursor-pointer" />
      </div>
    </div>
  )
}
