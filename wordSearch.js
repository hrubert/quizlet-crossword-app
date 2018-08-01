// Create a board object

function Board(size) {
    this.size = size;
    this.board = [];

    // create an empty board to the given specifications
    this.makeEmptyBoard = function () {
        for (let i = 0; i < this.size; i++) {
            let row = [];
            for (let j = 0; j < this.size; j++) {
                row.push("");
            }
            this.board.push(row);
        }
    }

    // finds a random location where the first word will fit horizontally
    this.getFirstPos = function(word) {
        y = Math.floor(Math.random()* (this.size));
        x = Math.floor(Math.random()* (this.size - word.length));
        return [word, x, y]; 
    }

    // places a word horizontally 
    this.placeHorizontal = function(arr) {
        let word = arr[0];
        let x = arr[1];
        let y = arr[2];
        for (let i = 0; i < word.length; i++) {
            
        }
    }

    this.fillBoard = function() {
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
        "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] == '') {
                    this.board[i][j] = alphabet[Math.floor(Math.random() * 26)];
                }
            }
        }
    }
}

var wSBoard = new Board(10);
wSBoard.makeEmptyBoard();
wSBoard.fillBoard();

var wordList= [["alabama", 'montgomery'], ['alaska', 'juneau'], ['arizona', 'denver'], ['arkansas', 'little rock'], ['california', 'colorado']];
    // for (let i = 0; i < 1; i++) {
    //     cWBoard.getFirstPos(wordList[i][0]);
    // }

console.log(wSBoard.board);