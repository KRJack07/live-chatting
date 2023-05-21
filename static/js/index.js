var socket = io()

socket.on('connect', function() {
    var name = prompt('반갑습니다!', '')

        if(!name) {
        name = '익명'
    }

    socket.emit('newUser', name)
})

/* 서버로부터 데이터 받은 경우 */
socket.on('update', function(data) {
    var chat = document.getElementById('chat')

    var message = document.createElement('div')
    var node = document.createTextNode(`${data.name}: ${data.message}`)
    var className = ''

  // 타입에 따라 적용할 클래스를 다르게 지정
    switch(data.type) {
        case 'message':
            className = 'other'
            break

        case 'connect':
            className = 'connect'
            break

        case 'disconnect':
            className = 'disconnect'
            break
    }

    message.classList.add(className)
    message.appendChild(node)
    chat.appendChild(message)
})

/* 메시지 전송 함수 */
function send() {
    var message = document.getElementById('test').value

    document.getElementById('test').value = ''

    var chat = document.getElementById('chat')
    var msg = document.createElement('div')
    var node = document.createTextNode(message)
    msg.classList.add('me')
    msg.appendChild(node)
    chat.appendChild(msg)

    socket.emit('message', {type: 'message', message: message})
}