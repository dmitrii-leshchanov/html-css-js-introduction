let array = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function fromNumberToString(number, base) {
    let result = '';
    do {
        let digit = number % base;
        let index = digit;
        result = array[index] + result;
        number = Math.trunc(number/base);
    } while (number != 0);

    return result;
}

function fromStringToNumber(string, base) {
    // let result = parseInt(string, base);
    let result = 0;
    for(let i = 0; i < string.length; i++) {
        let code = array.findIndex(el => el == string[i]);
        result = result * base + code;
    }
    return result;
}

console.log(fromNumberToString(900550, 36));
console.log(fromNumberToString(46016237, 36));
console.log(fromNumberToString(11483, 2));

console.log(fromStringToNumber('JAVA', 36));
console.log(fromStringToNumber('REACT', 36));
console.log(fromStringToNumber('10110011011011', 2));
