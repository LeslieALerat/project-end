// Timer Variables
let seconds = 0;
let interval = null;

// Game variables
var numSelected = null;
var tileSelected = null;
var gameOver = false;
const ERROR_PENALTY = 5;

var playerScore = null;
var errors = 0;

class Score {
    constructor(time) {
        this.secs = time % 60;
        this.mins = Math.floor(time / 60) % 60;
        this.hrs = Math.floor(time / 3600);

        if (this.secs < 10) this.secs = '0' + this.secs;
        if (this.mins < 10) this.mins = '0' + this.mins;
        if (this.hrs < 10) this.hrs = '0' + this.hrs;
        this.score = `${this.hrs}:${this.mins}:${this.secs}`;
    }
}

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

//var board = [
//    "-87491625",
//    "241568379",
//    "569327418",
//    "758619234",
//    "123784596",
//    "496253187",
//    "934176852",
//    "675832941",
//    "812945763"
//];

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

// Event Listeners
window.onload = function () {
    setGame();
    //THIS STARTS THE TIMER ON PAGE LOAD
    startTimer();
}

//Game functions
function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }
    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
    
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // get the coordinates of the tile to compare with the solution
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            board[r] = board[r].replaceAt(c, numSelected.id);
            checkWinState();
        }
        else {
            seconds += ERROR_PENALTY;
            timerFormat();
            //errors++;
            //document.getElementById("errors").innerText = errors;
        }
    }
}

//Timer functions ---------------------------

// Update the timer
function timer() {
    seconds++;

    timerFormat();
}
function timerFormat() {
    // Format the time
    let secs = seconds % 60;
    let mins = Math.floor(seconds / 60) % 60;
    let hrs = Math.floor(seconds / 3600);

    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = '0' + mins;
    if (hrs < 10) hrs = '0' + hrs;
    document.getElementById('time').innerText = `${hrs}:${mins}:${secs}`;
}
function startTimer() {
    if (interval) {
        return;
    }

    interval = setInterval(timer, 1000);
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    stop();
    seconds = 0;
    time_el.innerText = '00:00:00';
}

//Win state
function checkWinState() {
    gameOver = true;
    for (var r = 0; r < 9; r++) {
        for (var c = 0; c < 9; c++) {
            if (board[r][c] != solution[r][c]) {
                gameOver = false;
            }
        }
    }
    if (gameOver == true) {
        endGame();
    }
}

function endGame() {
    stopTimer();
    let winMessage = document.getElementById("win");
    winMessage.style.color = "coral";
    playerScore = new Score(seconds);
    console.log("Game over. Score: " + playerScore.score);
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

