import {initializeApp} from "firebase/app"
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const   firebaseConfig = {
    apiKey: "AIzaSyC5YMXfYZ1Bo--E_T7v3JjjBbys5XxEaoE",
    authDomain: "memories-app-205b2.firebaseapp.com",
    projectId: "memories-app-205b2",
    storageBucket: "memories-app-205b2.firebasestorage.app",
    messagingSenderId: "378662119207",
    appId: "1:378662119207:web:e25e4c40ffa4ea8283ab02",
    measurementId: "G-LWDZPELHVG"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export  {auth, googleProvider} 
