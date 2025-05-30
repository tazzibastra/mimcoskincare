import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics' // Import Analytics

// Firebase configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyBcuRpZnjibnwijvMvdQqhqzBlrGNTXUOM',
  authDomain: 'mimcoskin.firebaseapp.com',
  projectId: 'mimcoskin',
  storageBucket: 'mimcoskin.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'G-SQYB2XNK8K' // Make sure to add this from Firebase Console
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

// Initialize Google and Facebook Auth Providers
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()

// Initialize Analytics (only for client-side environments)
let analytics
if (typeof window !== 'undefined') {
  analytics = getAnalytics(firebaseApp)
}

export { analytics }
export default firebaseApp
