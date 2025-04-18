import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDJq9EsVuZ0AcdKp9Bevf3sh9oueHzw_zU',
  authDomain: 'estudo-chat-2190b.firebaseapp.com',
  projectId: 'estudo-chat-2190b',
  storageBucket: 'estudo-chat-2190b.firebasestorage.app',
  messagingSenderId: '1021488369230',
  appId: '1:1021488369230:web:56b3aba9a0ec421cb03d1f',
  measurementId: 'G-S6LV9G0FST',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export { db, auth, provider }
