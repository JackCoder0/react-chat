import * as EmailValidator from 'email-validator'
import { addDoc, collection, query, where } from 'firebase/firestore'
import { ChevronDown, ChevronLeft, ChevronUp, SquarePen } from 'lucide-react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

import { auth, db } from '@/lib/firebase'

import { AvatarPhoto } from './Avatar'
import { ChatFooter } from './Chat/ChatFooter'
import { TestChat } from './TestChat'
import { TestChats } from './TestChats'

interface TestProps {
  setUserChat: (userChat: any) => void
  userChat: any
}

export function Test({ setUserChat, userChat }: TestProps) {
  const [user] = useAuthState(auth)

  const [view, setView] = useState<'list' | 'chat'>('list')

  const handleSelectChat = (chat: any) => {
    setUserChat(chat)
    setView('chat')
  }

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

  const handleBackToMessages = () => {
    setUserChat(null) // Limpa o chat selecionado
    setView('list') // Volta para a visualização de lista
  }

  return (
    <div
      className={`fixed right-0 bottom-0 z-50 w-[430px] rounded-tl-md bg-gray-100 text-white shadow-xl transition-all duration-300 ${
        isOpen ? 'h-[70vh]' : 'h-[50px]'
      } flex flex-col`}
    >
      <div
        className="flex cursor-pointer items-center justify-between rounded-tl-md bg-blue-400 p-2 hover:bg-blue-600"
        onClick={togglePanel}
      >
        <div className="flex items-center gap-2">
          {/* Botão de Voltar (só aparece se estiver na view do chat) */}
          {view === 'chat' && (
            <button
              onClick={(e) => {
                e.stopPropagation() // impede de fechar o painel
                handleBackToMessages()
              }}
              className="cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <AvatarPhoto
            src={userChat ? userChat.photoURL : user?.photoURL || ''}
          />

          <p className="font-bold">{userChat ? userChat.name : 'Mensagens'}</p>
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
        <div className="flex flex-1 flex-col overflow-hidden">
          {view === 'list' && (
            <TestChats setUserChat={handleSelectChat} userChat={userChat} />
          )}

          {view === 'chat' && userChat?.chatId && (
            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-y-auto pr-1">
                <TestChat chatId={userChat.chatId} />
              </div>
              <ChatFooter chatId={userChat.chatId} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
