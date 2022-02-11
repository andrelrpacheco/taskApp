import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDF2zLf2kVPGy8e8lA3c58QYoycemlNxdg",
    authDomain: "tarefas-9054b.firebaseapp.com",
    projectId: "tarefas-9054b",
    storageBucket: "tarefas-9054b.appspot.com",
    messagingSenderId: "864236265362",
    appId: "1:864236265362:web:0ea17d61c2989191552b4b"
}

if(!firebase.apps.length) {
    //Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase
