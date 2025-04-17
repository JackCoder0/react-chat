import { auth, provider } from '@/lib/firebase'

export function Login() {
  const handleSignin = () => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
    <div className="flex h-screen cursor-pointer items-center justify-center">
      <button onClick={handleSignin} className="rounded-md border-2 p-2">
        Login com Google
      </button>
    </div>
  )
}
