function solution(A) {
    if(A.length === 0) return 0;
    
    const avg = A.reduce((accumulator, current) => accumulator + current) / A.length;
    const orderedArray = A.sort((a, b) => Math.abs(b - avg) - Math.abs(a - avg));

    let variants = new Set([0]);
    for(let element of orderedArray) {
        let newVariants = new Set();
        for(let value of variants.values())
        {
            var newValue = value + element;
            if(newValue >= -200 && newValue <= 200)
                newVariants.add(newValue);
                
            newValue = value - element;
            if(newValue >= -200 && newValue <= 200)
                newVariants.add(newValue);
        }
            
        variants = newVariants;
    }
    
    return Math.abs(Array.from(variants.values()).sort((a, b) => Math.abs(a) - Math.abs(b))[0]);
}