function solution(A, X) {
    const counts = new Map();
    for(const length of A) 
        counts.set(length, (counts.get(length) || 0) + 1);
        
    const lengths = Array.from(counts.entries())
                    .filter(([key, value]) => value >= 2)
                    .map(([key, value]) => key)
                    .sort((x, y) => x - y);
        
    let result = 0;
    const area = X;
    let upperBound = lengths.length;
    for(let i = 0; i < lengths.length; i++) {
        const length = lengths[i];
        const anotherLength = Math.ceil(area/length);
            
        if(length >= anotherLength && counts.get(length) >= 4)
            result++;
                
        for(; upperBound > i + 1 && lengths[upperBound - 1] >= anotherLength; upperBound--);
        result += lengths.length - Math.max(upperBound, i + 1);
            
        if(result > 1000000000) 
            return -1;
    }
        
        
    return result;
}