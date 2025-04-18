import * as EmailValidator from 'email-validator'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { ChevronDown, ChevronUp, SquarePen } from 'lucide-react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

import { auth, db } from '@/lib/firebase'

import { SideBarChats } from './SideBar/Chats/SideBarChats'

interface TestProps {
  setUserChat: (userChat: any) => void
  userChat: any
}

export function Test({ setUserChat, userChat }: TestProps) {
  const [user] = useAuthState(auth)

  const [isOpen, setIsOpen] = useState(() => {
    // Recupera estado do localStorage ao iniciar
    const saved = localStorage.getItem('testPanelOpen')
    return saved === 'true'
  })

  const togglePanel = () => {
    setIsOpen((prev) => {
      const next = !prev
      localStorage.setItem('testPanelOpen', String(next))
      return next
    })
  }

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
    <div
      className={`fixed right-0 bottom-0 z-50 max-h-[90%] w-[430px] rounded-tl-md bg-red-500 text-white shadow-xl transition-all duration-300 ${isOpen ? 'h-[70%]' : 'h-[50px]'}`}
    >
      <div
        className="flex cursor-pointer items-center justify-between rounded-tl-md bg-red-600 p-2 hover:bg-red-700"
        onClick={togglePanel}
      >
        <div className="flex items-center gap-2">
          <img
            className="h-9 w-9 rounded-full"
            src={user?.photoURL || undefined}
            alt="user photo"
          />
          <p className="font-bold">Mensagens</p>
        </div>

        <div className="flex items-center gap-2">
          <SquarePen
            size={24}
            className="cursor-pointer"
            onClick={handleCreateChat}
          />
          {isOpen ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </div>
      </div>

      {/* Conteúdo do painel */}
      {isOpen && (
        <div className="h-full overflow-y-auto p-4">
          <SideBarChats setUserChat={setUserChat} userChat={userChat} />
        </div>
      )}
    </div>
  )
}
