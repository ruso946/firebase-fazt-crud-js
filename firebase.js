// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1mAAAdyXSgLJkvtCSeoQQwFoGtf20FUY",
    authDomain: "fir-crud-javasc.firebaseapp.com",
    projectId: "fir-crud-javasc",
    storageBucket: "fir-crud-javasc.appspot.com",
    messagingSenderId: "909744793607",
    appId: "1:909744793607:web:5390c4cbc78c0909ed62a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export const saveTask = (title, description) => {
    addDoc (collection(db, "tasks"), {title, description})
};

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback )

export const getTask = id => getDoc(doc(db, "tasks", id))

export const deleteTask = id => deleteDoc(doc(db, "tasks", id))

export const updateTask = (id, newFields) =>
    updateDoc (doc(db, "tasks", id), newFields);