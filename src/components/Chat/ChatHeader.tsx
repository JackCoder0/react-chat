import { MdMoreVert, MdPerson, MdSearch } from 'react-icons/md'

import { AvatarPhoto } from '../Avatar'

interface ChatHeaderProps {
  photoURL: string | null | undefined
  name: string | null | undefined
}

export function ChatHeader({ photoURL, name }: ChatHeaderProps) {
  return (
    <div className="mb-1.5 flex h-14 items-center justify-between bg-[#f0f2f5] px-4 py-2.5">
      <div className="flex items-center gap-2">
        {photoURL ? <AvatarPhoto src={photoURL || ''} /> : <MdPerson />}
        <div className="font-semibold">{name}</div>
      </div>

      <div className="flex gap-2.5">
        <MdSearch />
        <MdMoreVert />
      </div>
    </div>
  )
}
