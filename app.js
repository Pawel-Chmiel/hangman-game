const keyboard = document.querySelector(".keyboard");
const alphabet = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń",
    "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "w", "x", "y", "z", "ź", "ż"];

// dodanie przycisków z literami alfabetu
alphabet.forEach(letter => {
    let buttonHTML = document.createElement("button");
    buttonHTML.setAttribute("class", "btn btn-disabled");
    buttonHTML.setAttribute("data-id", letter);
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

// uruchomienie klikania przycisków
enableButtonsHTML = () => {
    buttonsHTML.forEach(item => {
        item.disabled = false;
        item.classList.remove("btn-disabled");
    })
}

// główna funkcja gry odpalana po naciśnięciu buttona "start game"
const start = document.querySelector(".start");
start.addEventListener("click", () => {
    startGame();
});

startGame = () => {
    randomSentence();
    enableButtonsHTML();
    start.classList.add("start-disabled");
}

// baza filmów i losowanie hasła
const movieTitles = ["od zmierzchu do świtu", "przeminęło z wiatrem", "lot nad kukułczym gniazdem", "szeregowiec ryan", "skazani na shawshank", "chłopcy z ferajny", "milczenie owiec"];
let randomWord = [...movieTitles[Math.floor(Math.random() * movieTitles.length)]];
let currentWord = [];

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
    let currentWord = randomWord.slice();
    const letterSpan = document.querySelectorAll(".letter");
    if (currentWord.indexOf(letter) !== -1) {
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                letterSpan[i].innerText = letter;
            }
        }
    } else {
        hangmanUpdate();
    }
}

// podmiana obrazka hangmana
let mistakes = 0;
const maxWrong = 6;
hangmanUpdate = () => {
    const hangmanPic = document.querySelector(".hangmanPic");
    mistakes++;
    hangmanPic.setAttribute("src", `images/${mistakes}.jpg`);
    if (mistakes >= maxWrong) {
        gameOver();
    }
}

// koniec gry i reset
gameOver = () => {
    mistakes = 0;
}

