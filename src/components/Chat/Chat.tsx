import { Default } from '../Default'
import { ChatBody } from './ChatBody'
import { ChatFooter } from './ChatFooter'
import { ChatHeader } from './ChatHeader'

interface ChatProps {
  userChat: any
}

export function Chat({ userChat }: ChatProps) {
  if (!userChat) return <Default />

  return (
    <div className="flex w-full flex-col">
      <ChatHeader photoURL={userChat?.photoURL} name={userChat?.name} />
      <ChatBody chatId={userChat?.chatId} />
      <ChatFooter chatId={userChat?.chatId} />
    </div>
  )
}
