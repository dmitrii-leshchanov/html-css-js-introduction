function isAnagram(str1, str2) {   
    if(str1.length == str2.length) {
        const str1Ar = Array.from(str1);
        const str2Ar = Array.from(str2);
        const occurences = {};
        str1Ar.forEach(element => {
            if(occurences[element]) {
                occurences[element]++;
            } else {
                occurences[element] = 1;
            }
        })
        let isTrue = true;
        str2Ar.forEach((element, i) => {
            if(occurences[str2Ar[i]]) {
                occurences[element]--;          
            } else {
                occurences[element] = -1;
                isTrue = false;
                return isTrue;
            }
        })
        
        return isTrue;
           
    } else {
        return false;
    }
}

const word = "little";
const result = isAnagram(word, "litetl");

if(result == true) {
    console.log(`This is a anagram`)
} else {
    console.log(`This is not an anagram`)
}