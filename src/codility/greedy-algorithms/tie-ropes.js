function solution(K, A) {
    let result = 0;
    for(let i = 0; i < A.length;) {
        let totalLength = 0;
        for(;i < A.length && totalLength < K; totalLength += A[i], i++);
            
        if(totalLength >= K)
            result++;
    }
        
    return result;
}