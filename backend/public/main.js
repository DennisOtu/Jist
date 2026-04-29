const socket = io();
const msgForm = document.getElementById('msgForm');
const msgTxtBox = document.getElementById('msgTxtBox');
const msgThread = document.getElementById('msgThread');
const senderID = document.getElementById('senderID');

msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage()
});

socket.on('chat message', (data) => {
    addMessageToUI(false, data)
});

function sendMessage() {
    if (msgTxtBox.value) {
        const data = {
            name: senderID.value,
            message: msgTxtBox.value,
        }
        socket.emit('chat message', data);
        addMessageToUI(true, data)
        msgTxtBox.value = '';
    }
}

function addMessageToUI(isOwnMessage, data) {
    const element = `<li class="${isOwnMessage ? 'msgRight' : 'msgLeft'}">
                        <p class="msg">
                            ${data.message}
                            <br>
                            <span style="font-size: 9px; font-style: italic;">${data.name}</span>
                        </p>
                    </li>`
    msgThread.innerHTML += element
    scrollToBottom()
}

function scrollToBottom() {
    msgThread.scrollTo(0, msgThread.scrollHeight)
}