function isAnagram(str1, str2) {   
    if(str1.length == str2.length) {
        const str1Ar = Array.from(str1.toLowerCase());
        const str2Ar = Array.from(str2.toLowerCase());
        const occurences = getOccurance(str1Ar);
        let isTrue = true;
        str2Ar.forEach((element, i) => {
            if(occurences[str2Ar[i]]) {
                occurences[element]--;          
                if(occurences[element < 0]) {
                    isTrue = false;
                    return isTrue;
                }
            } else {
                isTrue = false;
                return isTrue;
            }
        })      
        return isTrue;        
    } 

    return false;
}

function getOccurance(strAr) {
    const occurences = {};
        strAr.forEach(element => {
            if(occurences[element]) {
                occurences[element]++;
            } else {
                occurences[element] = 1;
            }
        })
    return occurences;
}

const word = "LitTle";
const result = isAnagram(word, "litEtl");

if(result == true) {
    console.log(`This is a anagram`)
} else {
    console.log(`This is not an anagram`)
}

// V.R. Your list of test cases is very poor. 
const word1 = 'Yellow';
console.log('2. ', word1, 'weloly', isAnagram(word1, 'weloly'));
console.log('3. ', word1, 'leloyw', isAnagram(word1, 'leloyw'));
console.log('4. ', word1, 'wolley', isAnagram(word1, 'wolley'));
console.log('5. ', word1, 'weloyl', isAnagram(word1, 'weloyl'));
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
console.log('6. ', word1, 'weloll', isAnagram(word1, 'weloll'));  // (three “l” letters, should be two)
console.log('7. ', word1, 'leloy', isAnagram(word1, 'leloy'));   // (should be with the same length)
console.log('8. ', word1, 'wollet', isAnagram(word1, 'wollet')); // (letter “t” doesn’t exist)
console.log('9. ', word1, 'weloyo', isAnagram(word1, 'weloyo'));  //(two “o” letters, should be one)