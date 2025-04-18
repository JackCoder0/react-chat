import { MdMessage } from 'react-icons/md'

export function Default() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-[#f8f8f8] p-5">
      <MdMessage size={100} color="green" />
      <h1 className="text-center text-2xl">Chat APP</h1>
      <span className="max-w-[500px] text-center text-xl">
        Agora você pode enviar e receber mensagens sem precisar manter seu
        celular conectado à internet.
      </span>
    </div>
  )
}
