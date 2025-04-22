interface AvatarProps {
  src: string
  className?: string
  onClick?: () => void
}

export function AvatarPhoto({ src, className, onClick }: AvatarProps) {
  return (
    <img
      src={src}
      className={`h-9 w-9 cursor-pointer rounded-full ${className}`}
      alt="user photo"
      onClick={onClick}
    />
  )
}
