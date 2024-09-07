document.getElementById('sendButton').addEventListener('click', sendMessage);

function sendMessage() {
    let message = document.getElementById('messageInput').value;
    if (message) {
        let messagesDiv = document.getElementById('messages');
        let newMessage = document.createElement('div');
        newMessage.textContent = message;
        messagesDiv.appendChild(newMessage);

        document.getElementById('messageInput').value = '';
        // Aquí podrías hacer una petición POST a la API de GitHub Gists para almacenar los mensajes.
    }
}

// Para obtener los mensajes, podrías hacer una petición GET a la API de GitHub Gists
