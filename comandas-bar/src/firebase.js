// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiIe_etJ_X3wFFA5IjiRKuYt1RXO7tKcE",
  authDomain: "comandas-bar-a6811.firebaseapp.com",
  projectId: "comandas-bar-a6811",
  storageBucket: "comandas-bar-a6811.firebasestorage.app",
  messagingSenderId: "733376712773",
  appId: "1:733376712773:web:dac32ebdc7c5ac9ad3932c"
};

// Inicializa o app e exporta o banco de dados tudo junto, sem deixar variáveis sobrando
export const db = getDatabase(initializeApp(firebaseConfig));