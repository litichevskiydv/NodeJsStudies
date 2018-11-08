function solution(A) {
    var i = 0;
    let j = A.length - 1;
    let count = A.length;
    while(i < j)
    {
        const left = Math.abs(A[i]);
        const right = A[j];
        
        if(left > right)
        {
            if(A[i] == A[i+1])count--;
            i++;
        }
        else if(left < right)
        {
            if(A[j] == A[j-1])count--;
            j--;
        }
        else 
        {
            i++;
            count--;
        }
    }
        
    return count;
}