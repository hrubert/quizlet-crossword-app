const express = require('express')
var cors = require('cors')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const PORT = process.env.PORT || 3000

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(cors())

app.use(express.static('public'));

fetch('https://api.quizlet.com/2.0/sets/152676396?client_id=GRfAXGKv6t')
    .then(res => res.json())
    .then(json => console.log(json));

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