// Configuración de Firebase - Copia esto de Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAxY4rIR_lzDpEy5eRKBkXy_O1RME5Bhj0",
    authDomain: "kosmatsa-acdcc.firebaseapp.com",
    projectId: "kosmatsa-acdcc",
    storageBucket: "kosmatsa-acdcc.appspot.com",
    messagingSenderId: "4199342221",
    appId: "1:4199342221:web:f9ac601c96c5c806e702c4"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa Firestore
const db = firebase.firestore();

// Inicializa el sistema de autenticación
const auth = firebase.auth();

// Autenticación anónima (puedes usar otros métodos si prefieres)
auth.signInAnonymously().catch(error => {
    console.error('Error en autenticación:', error);
});

// Manejo de cambios en el estado de autenticación
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('Usuario autenticado:', user.uid);
    } else {
        console.log('Usuario no autenticado');
    }
});

// Enviar mensaje
document.getElementById('sendButton').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    if (message) {
        db.collection('messages').add({
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: auth.currentUser ? auth.currentUser.uid : 'anónimo'
        }).then(() => {
            document.getElementById('messageInput').value = '';
        }).catch(error => {
            console.error('Error al enviar mensaje:', error);
        });
    }
});

// Recibir mensajes en tiempo real
db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Limpiar mensajes anteriores
    snapshot.forEach(doc => {
        const messageData = doc.data();
        const messageText = messageData.text;
        const messageUser = messageData.uid ? messageData.uid : 'anónimo';
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${messageUser}: ${messageText}`;
        messagesDiv.appendChild(messageDiv);
    });
});
