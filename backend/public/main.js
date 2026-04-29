const socket = io();
const msgForm = document.getElementById('msgForm');
const msgTxtBox = document.getElementById('msgTxtBox');
const msgThread = document.getElementById('msgThread');

msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage()
});

socket.on('chat message', (msg) => {
    /*
    const item = document.createElement('li');
    item.textContent = msg;
    msgThread.appendChild(item);
    */

    addMessageToUI(false, msg)
});


function sendMessage() {
    if (msgTxtBox.value) {
    socket.emit('chat message', msgTxtBox.value);
    addMessageToUI(true, msgTxtBox.value)
    msgTxtBox.value = '';
    }


    /*
    if (messageInput.value === '') return
    // console.log(messageInput.value)
    const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
    }
    socket.emit('message', data)
    addMessageToUI(true, data)
    messageInput.value = ''
    */
}

function addMessageToUI(isOwnMessage, data) {
    const element = `<li class="${isOwnMessage ? 'msgRight' : 'msgLeft'}">
                        <p class="msg">
                            ${data}
                        </p>
                    </li>`
    /*
    clearFeedback()
    const element = `<li class="${isOwnMessage ? 'message-right' : 'message-left'}">
                        <p class="message">
                            ${data.message}
                            <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
                        </p>
                    </li>`
    */

  msgThread.innerHTML += element
  scrollToBottom()
}

function scrollToBottom() {
  msgThread.scrollTo(0, msgThread.scrollHeight)
}