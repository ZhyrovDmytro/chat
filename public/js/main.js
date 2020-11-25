const chat = document.getElementById('chat-form');
const socket = io();

function outputMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">Mary <span>9:15pm</span></p>
                <p class="text">
                   ${msg}
                </p>
    `;
    document.querySelector('.chat-messages').appendChild(div);

}

socket.on('message', message => {
    outputMessage(message);
});

chat.addEventListener('submit', (e) =>{
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    // emit mesg to the server
    socket.emit('chatMessage', msg);
});
