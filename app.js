let express = require('express');
let app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization')
    next();
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/crossword', function (req, res) {
    res.sendFile(path.join(__dirname+'/crossword.html'));
});

app.get('/wordsearch', function (req, res) {
    res.sendFile(path.join(__dirname+'/wordsearch.html'));
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});