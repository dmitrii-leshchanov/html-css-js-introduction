const word = "pappy";
const N_LETTERS = word.length;
const letterElements = document.querySelectorAll(".letter-guess");
const encounter = document.querySelector(".number-encounter");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");

let i = 6;

function onChange(event) {
    const wordGuess = event.target.value;
    i--;
    encounter.innerHTML = `Trials left: ${i}`;
    if(i >= 0 && wordGuess !== word) { 
        if(wordGuess.length != N_LETTERS) {
            alert(`A word should contain ${N_LETTERS} letters`)
        } else {
            const wordAr = Array.from(wordGuess);
            wordAr.forEach((l, i) => letterElements[i].innerHTML = l);
            const colors = wordAr.map((l, i) => {
                let index = word.indexOf(l);
                let res = 'red';
                if(index > -1) {
                    if(index == i || wordAr[i] == word[i]) {
                        res = 'green';
                    } else {
                        res = 'yellow';
                    }
                }
                return res;
            });
            colors.forEach((c, i) => letterElements[i].style.color = c);
        }
    } else if (wordGuess === word && i >= 0) {
        encounter.style.color = 'green';
        encounter.innerHTML = 'Congratulations - you have guessed a word!';
        input.disabled = true;
        btn.classList.remove('btn-hide');
        btn.classList.add('btn-show');
        btn.innerHTML = 'Want more?'
        btn.addEventListener('click', function() {
            window.location.reload();
        })
    }  else if (i < 0) {
        encounter.style.color = 'red';
        encounter.innerHTML = 'Sorry - your guess trials have ended up!';
        input.disabled = true;
        btn.classList.remove('btn-hide');
        btn.classList.add('btn-show');
        btn.addEventListener('click', function() {
            window.location.reload();
        })
    }
}