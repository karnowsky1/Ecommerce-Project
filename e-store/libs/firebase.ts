// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_PRODUCT,
  messagingSenderId: process.env.NEXT_PUBLIC_GOOGLE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

console.log(firebaseApp)

export default firebaseApp