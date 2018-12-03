function solution(A) {
    let result = [];
    result.push(A[0]);
    for(var i = 1; i < A.length; i++)
        result.push(Number.MIN_SAFE_INTEGER);
            
    for(var i = 0; i < A.length - 1; i++)
        for(var j = 1; j <= 6 && i + j < A.length; j++)
            result[i + j] = Math.max(result[i + j], result[i] + A[i + j]);
    return result[A.length - 1];
}