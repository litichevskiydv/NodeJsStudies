function solution(M, A) {
    var lastPositions = new Array(M + 1).fill(-1);
        var counts = new Array(A.length + 1).fill(0);
        
        var leftBound = 0;
        for(var i = 1; i <= A.length; i++)
        {
            counts[i] = counts[i - 1];
            counts[i] += Math.min(i - 1 - leftBound + 1, i - 1 - lastPositions[A[i - 1]]);
            if(counts[i] > 1000000000)
                return 1000000000;
            
            leftBound = Math.max(leftBound, lastPositions[A[i - 1]] + 1);
            lastPositions[A[i - 1]] = i - 1;
        }
        
        return counts[A.length];
}