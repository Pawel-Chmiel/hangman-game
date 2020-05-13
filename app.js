const keyboard = document.querySelector(".keyboard");
const alphabet = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń",
    "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "w", "x", "y", "z", "ź", "ż"];
// baza filmów i losowanie hasła
const movieTitles = ["Od zmierzchu do świtu", "Przeminęło z wiatrem", "Szeregowiec Ryan", "Skazani na Shawshank",
    "Chłopcy z ferajny", "Milczenie owiec", "Lot nad kukułczym gniazdem", "Leon zawodowiec", "Buntownik z wyboru",
    "Zapach kobiety", "W pogoni za szczęściem", "Ojciec chrzestny", "Złap mnie jeśli potrafisz", "Chłopaki nie płaczą"];
let randomMovie = movieTitles[Math.floor(Math.random() * movieTitles.length)];
let randomWord = [...randomMovie.toUpperCase()];
let currentWord = [];

// dodanie przycisków z literami alfabetu
alphabet.forEach(letter => {
    let buttonHTML = document.createElement("button");
    buttonHTML.setAttribute("class", "btn btn-disabled");
    buttonHTML.setAttribute("data-id", letter.toUpperCase());
    buttonHTML.innerText = letter;
    keyboard.appendChild(buttonHTML);
    buttonHTML.disabled = true;
});

// podpięcie eventów pod przyciski
const buttonsHTML = document.querySelectorAll(".btn");
buttonsHTML.forEach(item => {
    item.addEventListener("click", (e) => {
        let letter = e.target.dataset.id;
        const buttonHTML = e.target;
        buttonHTML.classList.add("btn-disabled");
        e.target.disabled = true;
        checkLetter(letter);
    })
})

// główna funkcja gry odpalana po naciśnięciu buttona "start game"
const start = document.querySelector(".start");
start.addEventListener("click", () => {
    startGame();
});

// uruchomienie klikania przycisków
enableButtonsHTML = () => {
    buttonsHTML.forEach(item => {
        item.disabled = false;
        item.classList.remove("btn-disabled");
    })
}
disableButtonsHTML = () => {
    buttonsHTML.forEach(item => {
        item.disabled = true;
        item.classList.add("btn-disabled");
    })
}

// funkcja uruchomiająca grę
const gameStart = document.querySelector(".game-start");
startGame = () => {
    randomSentence();
    enableButtonsHTML();
    hangmanPic.setAttribute("src", `images/${mistakes}.jpg`);
    start.remove();
    gameStart.innerHTML = `<p class="game-description">Hasło to tytuł filmu</p>`;
    letterSpaceCount();
}

// liczba spacji w haśle
let letterSpaceCounter = 0;
letterSpaceCount = () => {
    let letterSpace = document.querySelectorAll(".letter-space");
    letterSpaceCounter = letterSpace.length;
}

// tworzenie pola dla hasła 
randomSentence = () => {
    const result = document.querySelector(".result");
    result.innerText = "";
    randomWord.forEach(item => {
        const spanResult = document.createElement("span");
        spanResult.classList.add("letter");
        if (item === " ") {
            spanResult.classList.add("letter-space");
        }
        result.appendChild(spanResult);
    })
}

// sprawdzanie czy kliknięta litera znajduje się w haśle. Jeśli tak, to odsłonięcie liter, jeśli nie to hangmanUpdate()
checkLetter = (letter) => {
    const letterSpan = document.querySelectorAll(".letter");
    if (randomWord.indexOf(letter) !== -1) {
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === letter) {
                letterSpan[i].innerText = letter;
                currentWord.push(letter);
                checkIfGameWon();
            }
        }
    } else {
        hangmanUpdate();
    }
}

// podmiana obrazka hangmana
let mistakes = 0;
const maxWrong = 6;
const hangmanPic = document.querySelector(".hangmanPic");
hangmanUpdate = () => {
    mistakes++;
    hangmanPic.setAttribute("src", `images/${mistakes}.jpg`);
    if (mistakes >= maxWrong) {
        gameOver();
    }
}

// koniec gry i restart
gameOver = () => {
    mistakes = 0;
    disableButtonsHTML();
    console.log("game over");
    document.querySelector(".game-description").remove();
    gameStart.innerHTML = `<h3 class="game-lost">Przegrałeś :(
        <button class="btn-playagain">
            <a class="game-link" href="index.html">jeszcze raz?</a>
        </button>
    </h3>`;
}

// wygranie gry i restart
checkIfGameWon = () => {
    if (currentWord.length + letterSpaceCounter === randomWord.length) {
        document.querySelector(".game-description").remove();
        gameStart.innerHTML = `<h3 class="game-won">Brawo! :)
        <button class="btn-playagain">
            <a class="game-link" href="index.html">jeszcze raz?</a>
        </button>
    </h3>`;
    }
}

