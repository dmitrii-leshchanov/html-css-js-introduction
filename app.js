let number = 12345;
function sumDigits(number) {
    let sum = 0;
    if(number < 0) {
        number = -number;
    }
    for(i = 0; number != 0; i++) {
        sum = number % 10 + sum;
        number = Math.floor(number / 10);       
    }
    return sum;

}
console.log(sumDigits(number));
