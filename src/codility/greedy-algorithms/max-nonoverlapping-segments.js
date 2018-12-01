function solution(A, B) {
    if(A.length == 0)return 0;
        
    let intervalsCount = 1;
    let lastIntervalIndex = 0;
    for(let i = 1; i < A.length; i++)
        if(B[lastIntervalIndex] < A[i]) {
            intervalsCount++;
            lastIntervalIndex = i;
        }
            
    return intervalsCount;
}