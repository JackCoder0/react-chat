import { collection, limit, orderBy, query, where } from 'firebase/firestore'
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
  // Função para pegar o email do outro usuário
  const getUser = (
    users: string[],
    userLogged: { email: string | null },
  ): string | undefined =>
    users?.filter((user: string) => user !== userLogged?.email)[0]

  const userEmail = getUser(users, user)

  // Consulta para pegar o usuário do chat
  const userQuery =
    userEmail && query(collection(db, 'users'), where('email', '==', userEmail))

  const [getUserItem] = useCollection(userQuery || undefined)

  const Avatar = getUserItem?.docs?.[0]?.data()

  // Consulta para pegar as mensagens do chat ordenadas pela data de envio
  const messagesQuery = query(
    collection(db, 'chats', id, 'messages'),
    orderBy('timestamp', 'desc'),
    limit(1), // Pega apenas a última mensagem
  )

  const [messages] = useCollection(messagesQuery)

  const lastMessage = messages?.docs?.[0]?.data()

  const whoSent =
    lastMessage?.user === user.email
      ? 'Você'
      : Avatar?.displayName || 'Outro Usuário'

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
      className={`flex cursor-pointer items-center justify-start gap-5 rounded-md px-5 py-4 ${active}`}
      onClick={handleNewChat}
    >
      {Avatar ? (
        <img
          className="h-15 w-15 cursor-pointer rounded-full"
          src={Avatar?.photoURL || undefined}
          alt="user photo"
        />
      ) : (
        <div className="flex h-15 w-15 items-center justify-center rounded-full bg-gray-500">
          <MdPerson size={50} />
        </div>
      )}

      <div>
        <span className="text-lg font-medium">
          {Avatar?.displayName ? Avatar?.displayName : 'Sem nome'}
        </span>

        {lastMessage ? (
          <p className="truncate text-gray-500">
            <strong>{whoSent}:</strong> {lastMessage?.message}
          </p>
        ) : (
          <p className="truncate text-gray-500">Sem mensagens</p>
        )}
      </div>
    </div>
  )
}
