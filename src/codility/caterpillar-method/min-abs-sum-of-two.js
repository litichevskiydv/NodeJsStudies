function upperApproximation(numbers, value) {
    let left = 0;
    let right = numbers.length;
    while(left != right) {
        const current = (left + right) >> 1;
        if(numbers[current] < value)
            left = current + 1;
        else
            right = current;
    }
        
    return left;
}

function solution(A) {
    const numbers = A.sort((x, y) => x - y);
    
    let result = Math.abs(2*numbers[0]);
    for(let number of numbers){
        const value = -number;
            
        const upperIndex = upperApproximation(numbers, value);
        if(upperIndex != numbers.length)
            result = Math.min(result, Math.abs(number + numbers[upperIndex]));
            
        const lowerIndex = upperIndex - 1;
        if(lowerIndex != -1)
            result = Math.min(result, Math.abs(number + numbers[lowerIndex]));
    }
        
    return result;
}