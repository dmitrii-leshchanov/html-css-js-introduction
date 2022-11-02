let teudatStrNumber = '336097183'

function checkTeudatZehut(teudatStrNumber) {
    let newArStr = doubleOddIndex(teudatStrNumber);
    //console.log(newArStr);

    let finalAr = summOfOddIndexDigits(newArStr);
    //console.log(finalAr);

    let summOfDigitsTeudatZehut = summOfArElems(finalAr);
    //console.log(summOfDigitsTeudatZehut);

    return summOfDigitsTeudatZehut % 10 != 0 ? false : true;      
}

function doubleOddIndex(teudatStrNumber) {
    let arStr = Array.from(teudatStrNumber);
    let doubleOddsArStr = arStr.map(function(arStr, i) {
        return i % 2 == 0 ? arStr : arStr * 2;
    });
    return doubleOddsArStr;
}

function summOfOddIndexDigits(newArStr) {
    let arrayWithSummofOddDigits = newArStr.map(function(newArStr) {
        if(newArStr >= 10) {
            let sum = newArStr.toString().split('').map(Number).reduce(function(x,y) {
                return x + y;
            })
            return sum;
        } else {
            return newArStr;
        }
    });
    return arrayWithSummofOddDigits;
};

function summOfArElems(finalAr) {
    let sum = finalAr.map(Number).reduce(function(res, cur) {
        return res + cur;
    })
    return sum;
}

console.log(checkTeudatZehut(teudatStrNumber));
