// Create a board git pull

$(function () {
    var num = 1;

    function Board(size) {
        this.size = size;
        this.board = [];
        this.unplacedWords = [];

        // create an empty board to the given specifications
        this.makeEmptyBoard = function () {
            for (let i = 0; i < this.size; i++) {
                let row = [];
                for (let j = 0; j < this.size; j++) {
                    row.push({
                        "letter": " "
                    });
                }
                this.board.push(row);
            }
        }

        // master function to place words
        this.placeWords = function (wordArr) {
            // put the first word vertically, in the third column
            this.placeVertical(wordArr.shift(), 50, 50);
            // pop words off the front of the array until it is empty
            while (wordArr.length > 0) {
                this.findPos(wordArr.shift());
            }


            // implement a loop to place remaining words
            // while (this.unplacedWords.length > 1) {
            //     this.findPos(wordArr.shift());                
            // }
            this.stripEdges(this.board);

        }

        // see if there is a match for that letter on the board
        this.findPos = function (wordandDef) {
            let word = wordandDef[0];
            let def = wordandDef[1];
            // check every letter in the word 
            loop1:
                for (let i = 0; i < word.length; i++) {
                    //against every letter in the board
                    for (let y = 0; y < this.board.length; y++) {
                        for (let x = 0; x < this.board[y].length; x++) {
                            //if the letter matches, see if it will fit in the opposite orientation
                            if (word[i] == this.board[y][x].letter) {
                                let horizontal = this.board[y][x].horizontal;
                                if (horizontal) {
                                    if (this.canFitVer(word, x, y - i, i)) {
                                        this.placeVertical(wordandDef, x, y - i);
                                        break loop1;
                                    }
                                } else {
                                    if (this.canFitHor(word, x - i, y, i)) {
                                        this.placeHorizontal(wordandDef, x - i, y);
                                        break loop1;
                                    }
                                }
                            }
                        }
                    }
                    if (i == word.length - 1) {
                        this.unplacedWords.push(wordandDef);
                    }
                }

        }

        // places a word vertically
        this.placeVertical = function (word, x, y) {
            for (let i = 0; i < word[0].length; i++) {
                if (i == 0) {
                    this.board[y + i][x] = new Letter(word[0][i], false, word[1], num);
                    num++;
                } else {
                    this.board[y + i][x] = new Letter(word[0][i], false, word[1]);
                }
            }

        }

        // checks to see if the word will fit vertically in that spot.
        this.canFitVer = function (word, x, y, index) {
            console.log(this.board);
            for (let i = 0; i < word.length; i++) {
                if (this.board[y - 1][x].letter != " " || this.board[y + word.length][x].letter != " ") {
                    return false;
                } else if ((this.board[y + i][x].letter != word[i] && this.board[y + i][x].letter != ' ')) {
                    return false;
                } else if (i != index && (this.board[y + i][x + 1].letter != ' ' || this.board[y + i][x - 1].letter != ' ')) {
                    return false;
                }
            }
            return true;
        }

        // places a word horizontally
        this.placeHorizontal = function (word, x, y) {
            for (let i = 0; i < word[0].length; i++) {
                if (i == 0) {
                    this.board[y][x + i] = new Letter(word[0][i], true, word[1], num);
                    num++;
                } else {
                    this.board[y][x + i] = new Letter(word[0][i], true, word[1]);
                }
            }
        }

        // checks to see if the word will fit horizontally in that spot.
        this.canFitHor = function (word, x, y, index) {
            for (let i = 0; i < word.length; i++) {
                if (this.board[y][x - 1].letter != " " || this.board[y][x + word.length].letter != " ") {
                    return false;
                } else if (this.board[y][x + i].letter != word[i] && this.board[y][x + i].letter != ' ') {
                    return false;
                } else if (i != index && (this.board[y + 1][x + i].letter != " " || this.board[y - 1][x + i].letter != " ")) {
                    return false;
                }
            }
            return true;
        }

        this.stripEdges = function () {
            //strip top
            loop1: for (let y = 0; y < this.board.length; y++) {
                for (let x = 0; x < this.board[y].length; x++) {
                    if (this.board[y][x].letter != " ") {
                        this.board.splice(0, y);
                        break loop1;
                    }
                }
            }
            //strip bottom
            loop1: for (let y = this.board.length - 1; y > 0; y--) {
                for (let x = 0; x < this.board[y].length; x++) {
                    if (this.board[y][x].letter != " ") {
                        this.board.splice(y + 1, );
                        break loop1;
                    }
                }
            }
            //strip left and right
            let rightMargin = 0;
            for (let y = 0; y < this.board.length; y++) {
                for (let x = 50; x < this.board[y].length; x++) {
                    if (this.board[y][x].letter != " " && x > rightMargin) {
                        rightMargin = x;
                    }
                }
            }

            let leftMargin = 0;
            loop1:
            for (let y = 0; y < this.board.length; y++) {
                for (let x = 50; x >= 0; x--) {
                    let letterPresent = false;
                    if (this.board[y][x].letter != " ") {
                        letterPresent = true;
                    }
                    if (letterPresent == false && x > leftMargin) {
                        leftMargin = x;
                        break loop1;
                    }
                }
            }

            for (let y = 0; y < this.board.length; y++) {
                this.board[y].splice(rightMargin + 1, this.board[y].length);
                this.board[y].splice(0, leftMargin);
            }


        }
    }

    function Letter(letter, horizontal, clue, num = false) {
        this.letter = letter;
        this.horizontal = horizontal;
        this.clue = clue;
        this.num = num;
    }


    function makeWordSearch(wordArr) {
        let wSBoard = new Board(100);
        wSBoard.makeEmptyBoard();
        wSBoard.placeWords(wordArr);
        return wSBoard
    }

    let switched;


    $("#importSet").click(function () {
        // get the set with the given ID
        switched = false;
        $("#display-crossword").empty();
        $("#clue-list").empty();
        $("#heading").empty();
        let url = $("#setID").val();
        importSet(url);
    });

    function importSet(url) {
        let id = "GRfAXGKv6t"
        // let setID = getSetID(url);


        $.get("https://api.quizlet.com/2.0/sets/165539434" + "?client_id=" + id)


            // $.get("https://api.quizlet.com/2.0/sets/" + setID + "?client_id=" + id)
            .done(function (response) {
                extractSetInfo(response);
            })
            .fail(function (error) {
                console.log(error);
            })
    }

    function getSetID(url) {
        return /\d{6,}/g.exec(url)[0];
    }

    function extractSetInfo(obj) {
        $("#title").text(obj.title);
        let terms = obj.terms;
        if (!switched) {
            var wordList = terms.map(term => [term.term.toLowerCase().split(" ").join(''), term.definition]);
        } else {
            var wordList = terms.map(term => [term.definition.toLowerCase().split(" ").join(''), term.term]);
        }
        let wSBoard = (makeWordSearch(wordList.slice(0, 29)));
        displayCrossword(wSBoard);
    }

    function displayCrossword(boardObj) {
        let board = boardObj.board;
        for (let i = 0; i < board.length; i++) {
            var $row = $("<div>");
            $($row).addClass("cwordRow");
            for (let j = 0; j < board[i].length; j++) {
                var $col = $("<div>");
                if (board[i][j].letter == " ") {
                    $($col).addClass("black-box");
                } else {
                    $($col).addClass("white-box");
                    $($col).text(board[i][j].letter);
                }
                $($row).append($col);
            }
            $("#display-crossword").append($row);
        };


        // append clues to the page
        // let clues = boardObj.clueList;
        // for (let clue of clues) {
        //     let $clue = $("<li>", {
        //         "text": clue,
        //         "class": "col-md-2"
        //     })
        //     $("#clue-list").append($clue);
        // }

        $("#heading").append("<p>Name:</p>");
        $("#heading").append("<p>Date:</p>");
        $("#heading").append("<p>Class:</p>");

        if (boardObj.unplacedWords.length > 0) {
            let text = boardObj.unplacedWords;
            text = text.join(", ")
            $("#unplacedwords").text(text);
            $('.modal').modal('show');
        }
    }

    $("#switch").click(function () {
        // get the set with the given ID
        switched = true;
        $("#display-crossword").empty();
        $("#clue-list").empty();
        $("#heading").empty();
        let url = $("#setID").val();
        importSet(url);
    });
});