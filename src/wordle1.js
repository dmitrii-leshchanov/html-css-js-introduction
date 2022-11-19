const words = ["string", "beach", "apple", "react", "bus", "dress"];
const questions = ["JavaScript data type", "Place with sand and water", "Fruit that can be green, yellow, red", "Modern JS Framework", "A kind of transport", "A kind of clothes"];

let index = Math.floor(Math.random() * words.length);
let wordField = words[index];
let wordFieldAr = Array.from(wordField);
let res = wordFieldAr.map(letter => `<div class="letter-guess">${letter}</div>`);

const sectionElement = document.querySelector(".word-guess")
sectionElement.innerHTML = res.join('');
const sectionQuestion = document.querySelector(".question-guess");
sectionQuestion.innerHTML = questions[index];
const letterElements = document.querySelectorAll(".letter-guess");
const wrongLetter = document.querySelector(".wrong-letter")
const input = document.querySelector(".input");

const gameOverElement = document.querySelector(".game-over-message");
const playAgainElement = document.getElementById("play-again");

console.log(letterElements);


function onChange(event) {
    const letterGuess = event.target.value;

    wordFieldAr.forEach((l, i) => {
        if(l.includes(letterGuess)) {
            letterElements[i].style.background = "white";
        }
    })

    clear(input);
}

function startGame() {
    const arrayOfBgs = Array.from(letterElements);

    if(arrayOfBgs.every(bg => bg.style.background == "white")) {
        window.location.reload();
    } else {
        alert('You should guess this word first!');
    }
}

function clear(target) {
    target.value = "";
}