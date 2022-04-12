
const socket = io()

let name ;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
let count = 0;
let count1 = 0;

do{
    name = prompt('Please enter your name: ')
}while(!name)

textarea.addEventListener('keyup',(e) =>{
    if(e.key == 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(mssg){
    let msg = {
        user : name,
        message : mssg.trim()
    }
    if(count==0){
        messageArea.innerHTML = "<p></p>"
    }
    count=2;

    appendMessage(msg,'outgoing')
    textarea.value = ''

    //Send message to server
    socket.emit('message',msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    mainDiv.classList.add(type,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
    scrollToBottom()

}

//Recieve the incoming message

socket.on('message',(msg)=>{
    if(count1==0){
        messageArea.innerHTML = "<p></p>"
    }
    count1=2;
    appendMessage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}