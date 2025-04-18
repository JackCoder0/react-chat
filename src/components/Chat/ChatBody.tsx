import { collection, doc, orderBy, query } from 'firebase/firestore'
import { useEffect, useRef } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

import { db } from '@/lib/firebase'

import { Message } from './Message'

interface ChatBodyProps {
  chatId: string
}

export function ChatBody({ chatId }: ChatBodyProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const messagesQuery = query(
    collection(doc(db, 'chats', chatId), 'messages'),
    orderBy('timestamp', 'asc'),
  )

  const [messagesRes, loading, error] = useCollection(messagesQuery)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messagesRes])

  if (loading) return <p>Carregando mensagens...</p>
  if (error) return <p>Erro ao carregar mensagens: {error.message}</p>

  return (
    <div className="flex-1 overflow-y-auto bg-[#efeae2]">
      {messagesRes?.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          name={message.data().name}
          message={{
            message: message.data().message,
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
