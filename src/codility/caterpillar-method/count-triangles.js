function upperBound(numbers, startIndex, value) {
    let left = startIndex;
    let right = numbers.length;
    while(left != right) {
        const current = (left + right) >> 1;
        if(numbers[current] <= value)
            left = current + 1;
        else
            right = current;
    }
        
    return left;
}

function lowerBound(numbers, startIndex, value) {
    let left = startIndex;
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
        
    let result = 0;
    for(let i = 0; i < numbers.length; i++)
        for(let j = i + 1; j < numbers.length - 1; j++)
        {
            const maxValue = numbers[i] + numbers[j];
            const minValue = Math.max(numbers[i] - numbers[j], numbers[j] - numbers[i]);
            if(numbers[j + 1] >= maxValue || numbers[numbers.length - 1] <= minValue)
                continue;
                    
            const startIndex = upperBound(numbers, j + 1, minValue);
            const endIndex = lowerBound(numbers, j + 1, maxValue) - 1;
            result += Math.max(0, endIndex - startIndex + 1);
        }
        
    return result;
}