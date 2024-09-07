// Configuración de Firebase - Copia esto de Firebase Console
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
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
