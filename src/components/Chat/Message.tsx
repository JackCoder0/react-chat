import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '@/lib/firebase'

import { AvatarPhoto } from '../Avatar'

interface MessageProps {
  user: string
  name?: string
  photoURL?: string
  message: {
    message: string
    timestamp: number
  }
}

export function Message({ user, name, photoURL, message }: MessageProps) {
  const [userLoggedIn] = useAuthState(auth)

  const isCurrentUser = userLoggedIn?.email === user

  return (
    <div
      className={`m-2.5 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className="flex max-w-[80%] items-end gap-2">
        {!isCurrentUser && photoURL && <AvatarPhoto src={photoURL || ''} />}
        <div
          className={`flex flex-col rounded-xl p-2 font-bold ${isCurrentUser ? 'bg-green-500 text-white' : 'bg-white text-black'}`}
        >
          {!isCurrentUser && name && (
            <span className="mb-1 text-xs font-semibold text-gray-700">
              {name}
            </span>
          )}
          <span>{message.message}</span>
          <span className="text-right text-xs font-normal text-gray-600">
            {new Date(message.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
