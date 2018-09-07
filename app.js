const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/crossword', function (req, res) {
    res.sendFile(path.join(__dirname+'/crossword.html'));
});

app.get('/wordsearch', function (req, res) {
    res.sendFile(path.join(__dirname+'/wordSearch.html'));
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});