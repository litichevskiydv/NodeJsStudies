function solution(S) {
    let result = null;
        
    var words = S.split(" ");
    for(const word of words){
        let lettersCount = 0;
        let digitsCount = 0;
        let hasInvalidCharacters = false;
        for(var character of word) {
            if(character.match(/[a-zA-Z]/i))
                lettersCount++;
            else if(character.match(/[0-9]/i))
                digitsCount++;
            else {
                hasInvalidCharacters = true;
                break;
            }
        }
        
        if(!hasInvalidCharacters && lettersCount % 2 === 0 && digitsCount % 2 === 1 && (!result || result.length < word.length))
            result = word;
    }
        
    return result ? result.length : -1;
}