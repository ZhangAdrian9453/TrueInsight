import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1Nn6hPahmnZTaf7qecg3ICxlao5CiGHY",
  authDomain: "trueinsight-6453d.firebaseapp.com",
  projectId: "trueinsight-6453d",
  storageBucket: "trueinsight-6453d.firebasestorage.app",
  messagingSenderId: "309320438430",
  appId: "1:309320438430:web:29dfb1ad5dfb71180e218f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
