import { SideBarChats } from './Chats/SideBarChats'
import { SideBarHeader } from './SideBarHeader'

interface SideBarProps {
  setUserChat: (userChat: any) => void
  userChat: any
}

export function SideBar({ setUserChat, userChat }: SideBarProps) {
  return (
    <div className="h-screen w-[35%] max-w-[415px] border-r border-[#ddd]">
      <SideBarHeader setUserChat={setUserChat} />
      <SideBarChats setUserChat={setUserChat} userChat={userChat} />
    </div>
  )
}
