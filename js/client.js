const socket = io('http://localhost:8000');
// get DOM element in respective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
// Audio that will play on recieving message
var audio = new Audio('ting.mp3');


// Function which will append event in to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();

    }
} 
// ask new user for his/her name  and let the sever know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// if a new user joins, receive his/her name  from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})
// if server sends a message , receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})
// if a user leaves the chat , append the info to the container
socket.on('left', name =>{
    append(`${name} left the chat`, 'left')
})
// if the form get submitted , send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})