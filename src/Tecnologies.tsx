interface TechProps {
  name: string
  file: string
}

export function Tech({ name, file }: TechProps) {
  return (
    <div className="flex items-center gap-3">
      <img src={file} alt={name} className="h-10 w-10" />
      <h1 className="text-center text-xl font-bold">{name}</h1>
    </div>
  )
}
