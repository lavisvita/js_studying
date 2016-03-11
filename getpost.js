var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server;
app.disable('x-powered-by');
app.set('view engine', 'jade');
var store = {
        home: {
            page: 'Main page',
            content: 'new content for page'
        },
        about: {
            page: 'About page',
            content: 'Some text about page and site'
        },
        contact: {
            page: 'contact page',
            content: 'Contacts'
        }
},
    storeKeys = Object.keys(store);
app.use(function(req, res, next){
   console.log('%s %s', req.method, req.url);
    next();
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/about', function(req, res){
    res.render('about', {
        links: storeKeys
    });
});
app.route('/new')
    .get(function(req, res){
       res.render('new', {
           page: 'Add new',
           links: storeKeys
       })
    })
    .post(function(req,res){
        var data = req.body;
        if(data.pageurl && data.pagename && data.pagecontent){
            store[data.pageurl] = {
                page: data.pagename,
                content: data.pagecontent
            };
            storeKeys = Object.keys(store);
        }
        res.redirect('/');
    });
app.get('/:page?', function(req, res){
    var page = req.params.page, data;
    if(!page) page = 'home';
    data = store[page];
    if(!data) return res.redirect('/');
    data.links = Object.keys(store);
    res.render('main', data);
});



server = app.listen(3000, function(){
   console.log('listening on port 3000');
});