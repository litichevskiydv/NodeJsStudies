function solution(A) {
    let result = 0;
        
    let maxHeight = 0;
    let minHeight = Number.MAX_SAFE_INTEGER;
    for(const height of A) {
        result = Math.max(result, Math.min(maxHeight, height) - minHeight);
            
        if(height >= maxHeight) {
            maxHeight = height;
            minHeight = height;
        } 
        else if(height < minHeight)
            minHeight = height;
    }
        
    return result;
}