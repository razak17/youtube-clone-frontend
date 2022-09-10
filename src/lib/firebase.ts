import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseApiKey = import.meta.env.VITE_FIREBASE_KEY;

const firebaseConfig = {
	apiKey: firebaseApiKey,
	authDomain: 'clone-3fde8.firebaseapp.com',
	projectId: 'clone-3fde8',
	storageBucket: 'clone-3fde8.appspot.com',
	messagingSenderId: '760372832190',
	appId: '1:760372832190:web:e7fa8adf7b5c0e3629fbef'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
