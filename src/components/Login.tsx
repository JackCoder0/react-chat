import { signInWithPopup } from 'firebase/auth'

import { auth, provider } from '@/lib/firebase'

export function Login() {
  const handleSignin = () => {
    signInWithPopup(auth, provider).catch(alert)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={handleSignin}
        className="cursor-pointer rounded-md border-2 p-2"
      >
        Login com Google
      </button>
    </div>
  )
}
