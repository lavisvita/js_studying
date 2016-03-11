//$(document).ready(function () {
//    var socket = io();
//    var socket = io.connect('http://localhost:3000');
//    var name = $.cookie('nickName');
//    function getMessage(name, messageOfField){
//        var getmessage = name +' said: '+ messageOfField;
//        $('.chat-messages')
//            .append($('<p>').text(getmessage));
//    }
//    socket.on('chat message', function(data){
//        getMessage(data.name, data.message);
//    });
//    socket.on('all chat message', function(data){
//        getMessage(data.name, data.message);
//        if(data.message === '/refresh')
//            location.reload();
//        console.log(data.message);
//    });
//
//    $("#send-message").click(function () {
//        var messageOfField = $('#message-of-field').val();
//        $('#message-of-field').val('');
//        socket.emit("chat message", {message: messageOfField, name: name});
//        socket.emit("all chat message", {message: messageOfField, name: name});
//
//    });


//    var socket = io.connect('http://localhost:8008');
//    var name = 'Пётр_' + (Math.round(Math.random() * 10000));
//    var messages = $("#messages");
//    var message_txt = $("#message_text")
//    $('.chat .nick').text(name);
//
//    function msg(nick, message) {
//        var m = '<div class="msg">' +
//            '<span class="user">' + safe(nick) + ':</span> '
//            + safe(message) +
//            '</div>';
//        messages
//            .append(m)
//            .scrollTop(messages[0].scrollHeight);
//    }
//
//    function msg_system(message) {
//        var m = '<div class="msg system">' + safe(message) + '</div>';
//        messages
//            .append(m)
//            .scrollTop(messages[0].scrollHeight);
//    }
//
//    socket.on('connecting', function () {
//        msg_system('Соединение...');
//    });
//
//    socket.on('connect', function () {
//        msg_system('Соединение установлено!');
//    });
//
//    socket.on('message', function (data) {
//        msg(data.name, data.message);
//        message_txt.focus();
//    });
//
//    $("#message_btn").click(function () {
//        var text = $("#message_text").val();
//        if (text.length <= 0)
//            return;
//        message_txt.val("");
//        socket.emit("message", {message: text, name: name});
//    });
//
//    function safe(str) {
//        return str.replace(/&/g, '&amp;')
//            .replace(/</g, '&lt;')
//            .replace(/>/g, '&gt;');
//    }
//});
