import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MdSend } from 'react-icons/md'

import { auth, db } from '@/lib/firebase'

interface ChatFooterProps {
  chatId: string
}

export function ChatFooter({ chatId }: ChatFooterProps) {
  const [user] = useAuthState(auth)
  const [message, setMessage] = useState('')

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (message.trim()) {
      try {
        await addDoc(collection(db, 'chats', chatId, 'messages'), {
          message,
          user: user?.email,
          name: user?.displayName,
          photoURL: user?.photoURL,
          timestamp: serverTimestamp(),
        })
        setMessage('')
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error)
      }
    }
  }

  return (
    <div className="bottom-0 flex h-[62px] w-full bg-gray-500 px-5 py-2.5">
      <form
        className="flex w-full items-center gap-1.5"
        onSubmit={handleSendMessage}
      >
        <input
          className="w-full rounded-md border-0 p-2.5 outline-0"
          type="text"
          placeholder="Mensagem"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <MdSend onClick={handleSendMessage} />
      </form>
    </div>
  )
}
