const chat = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

const {username, room} = Qs.parse(location.search, {
   ignoreQueryPrefix: true
});

socket.emit('JoinRoom', {username, room});

function outputMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">${msg.user}<span> ${msg.time}</span></p>
                <p class="text">
                   ${msg.msg}
                </p>
    `;
    document.querySelector('.chat-messages').appendChild(div);

}

socket.on('message', message => {
    console.log(message);

    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chat.addEventListener('submit', (e) =>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    // emit mesg to the server
    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});
