import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAuT_X4t7328swS61SjtkG8J-L9ZH0q7Ls",
  authDomain: "leker-843a1.firebaseapp.com",
  databaseURL: "https://leker-843a1-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ pakai URL asia-southeast1
  projectId: "leker-843a1",
  storageBucket: "leker-843a1.appspot.com",
  messagingSenderId: "540736932317",
  appId: "1:540736932317:web:e9f9e7bb40cd17776dce34",
  measurementId: "G-5FM8XKYMKL",
};

// ✅ Cegah error “Firebase App named '[DEFAULT]' already exists”
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getDatabase(app);
