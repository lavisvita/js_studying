var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    app = express(),
    cookieParser = require('cookie-parser');
var mongodb = require('mongodb'),
    User = require('./model/user.js'),
    path = require('path'),
    favicon = require('serve-favicon'),
    server;
    server = app.listen(3000, function(){
        console.log('listening on port 3000');
    });

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(favicon(path.join(__dirname + '/public/images/favicon.ico')));
app.use(express.static(__dirname + '/node_modules'));

app.get('/register', function(req, res){
    res.render('register');
});
app.get('/signin', function(req, res){
    res.render('signin');
});
app.get('/home', function(req, res){
    res.render('index');
});
app.get('/', function(req, res){
    res.render('index');
});
app.get('/chat', function(req, res){
    res.render('chat');
});





