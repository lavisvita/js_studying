options = {
    // some air
};
var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    app = express();
var mongodb = require('mongodb'),
    User = require('./model/user.js'),
    path = require('path'),
    favicon = require('serve-favicon'),
    server;
    server = app.listen(3000, function(){
        console.log('listening on port 3000');
    });
var cookieParser = require('cookie-parser'),
    io = require('socket.io').listen(server, options);
var crypto = require('crypto');

var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = 'password';
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.set('node_modules', __dirname + '/node_modules');
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(favicon(path.join(__dirname + '/public/images/favicon.ico')));
    app.use(express.static(__dirname + '/node_modules'));
app.post('/user/add', function(req, res){
    var obj = req.body,
        regData = '',
        result = [],
        regUser = '',
        regUserName = '',
        regUserPassword = '';
    for(var value in obj){
        regData=value;
    }
    result = regData.split(',');
    regUser = result[0].replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "");
    regUserName = result[1].replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "");
    regUserPassword = result[2].replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "");
    console.log('regUser: ' + regUser + '\n' + 'regUserName: ' + regUserName + '\npassword: '+ regUserPassword);

    function passCrypt(text){
        var cipher = crypto.createCipher(algorithm, key);
        var encrypted = cipher.update(text,'utf8','hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    var encryptedPass = passCrypt(regUserPassword);
    console.log(encryptedPass);
    var newUser = new User({
        name: regUser,
        username: regUserName,
        password: encryptedPass
    });

    newUser.pre('save', function(next){
       var currentDate = new Date();
       this.updated_at = currentDate;
       if(!this.created_at)
        this.created_at = currentDate;
       next();
    });
    newUser.save(function(err){
        if(err) {
            res.send(false);
            throw err;
        }
        else{
            res.send(true);
            console.log('User saved successfully');
        }
    });
});

app.post('/signin', function(req, res, next){
    var obj = req.body,
        authData = '',
        result = [],
        userName = '',
        userPasswordDb = '',
        userPassword= '';
    for(var value in obj){
        authData=value;
    }
    result = authData.split(',');
    userName = result[0].replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "");
    userPassword = result[1].replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "");
    var passwordOnRequest = userPassword;
    User.find({username: userName}, function(err, user){
        if (0 === user.length){ res.send(false);
        }else{
            userName = user[0].username;
            userPasswordDb = user[0].password;
            function decrypt(text){
                var decipher = crypto.createDecipher(algorithm, key);
                var dec = decipher.update(text,'hex','utf8');
                dec += decipher.final('utf8');
                return dec;
            }
            var decryptPass = decrypt(userPasswordDb);
            if(passwordOnRequest === decryptPass){
                res.cookie('nickName',userName);
                console.log(nickName);
                res.send(true);
            }
            else{
                res.send(false);
            }
        }
    });
});
io.on('connection', function(socket) {
    socket.on('send:message', function (data) {
        socket.broadcast.emit('send:message', {
            nickName: data.nickName,
            text: data.message
        });
    });
});


//app.get('/:page?', function(req, res){
//    var page = req.params.page;
//    console.log(page);
//        if(!page) res.render('index', {pages: pages});
//        else res.render(page, {title: page, pages: pages});
//});

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





