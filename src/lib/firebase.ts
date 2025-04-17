import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDJq9EsVuZ0AcdKp9Bevf3sh9oueHzw_zU',
  authDomain: 'estudo-chat-2190b.firebaseapp.com',
  projectId: 'estudo-chat-2190b',
  storageBucket: 'estudo-chat-2190b.firebasestorage.app',
  messagingSenderId: '1021488369230',
  appId: '1:1021488369230:web:56b3aba9a0ec421cb03d1f',
  measurementId: 'G-S6LV9G0FST',
}

const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
