let array = [];

function checkTeudatZehut() {
    let randomizedArr =  randomizeArray();
    //console.log(randomizedArr);

    let doubledArray =  doubleRandomizedArray(randomizedArr);
    //console.log(doubledArray);

    let summedArray = summOfOddIndexDigits(doubledArray);
    //console.log(summedArray);

    let fulledArray = addNinthDigit(summedArray);
    //console.log(fulledArray);

    let numberOfTeudatZehut = fulledArray.join('');

    return numberOfTeudatZehut;
}

function randomizeArray() {
    array.push(Math.round(Math.random() * 9 + 0.5));
    for(i = 1; i < 8; i++) {
        array.push(Math.round(Math.random() * 9));
    };

    return array;
}

function doubleRandomizedArray(randomizedArr) {
    let doubleOddsRandomizedArray = randomizedArr.map(function(randomizedArr, i) {
        return i % 2 == 0 ? randomizedArr : randomizedArr * 2;
    });
    return doubleOddsRandomizedArray;
}

function summOfOddIndexDigits(doubledArray) {
    let arrayWithSummofOddDigits = doubledArray.map(function(doubledArray) {
        if(doubledArray >= 10) {
            let sum = doubledArray.toString().split('').map(Number).reduce(function(x,y) {
                return x + y;
            })
            return sum;
        } else {
            return doubledArray;
        }
    });
    return arrayWithSummofOddDigits;
};

function addNinthDigit(summedArray) {
    let sum = summedArray.reduce(function(res, cur) {
            return res + cur;
        })
    //console.log(sum);
    
    for(i = 0; i < 100; i++) {
        let ninthDigit = Math.round(Math.random() * 9);
        if((ninthDigit + sum) % 10 == 0) {
            summedArray.push(ninthDigit);
            return summedArray;
        }
    }

}

console.log(checkTeudatZehut());