function check(a, k, minimalLargeSum){
    for(var i = 0, blocksCount = 0; i < a.length && blocksCount < k; blocksCount++)
        for(var blockSum = 0; i < a.length && blockSum + a[i] <= minimalLargeSum; blockSum += a[i], i++);
        
    if(blocksCount < k || blocksCount == k && i == a.length)
        return true;
    return false;
}

function solution(K, M, A) {
    let left = Math.max.apply(null, A);
    let right = A.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    while(right - left > 0)
    {
        let current = (right + left) >> 1;
        if(check(A, K, current) == false)
            left = current + 1;
        else
            right = current;
    }
        
    return right;
}