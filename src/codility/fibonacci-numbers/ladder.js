class Matrix {
    constructor(a00, a01, a10, a11){
        this.a00 = a00;
        this.a01 = a01;
        this.a10 = a10;
        this.a11 = a11;
    } 
    
    static multiplySafely(a, b, mod){
        return ((4096 * ((a * (b >> 12)) % mod)) + (a * (b % 4096)));
    }
    
    multiply(b, mod){
        let tmp_a00 = (Matrix.multiplySafely(this.a00, b.a00, mod) + Matrix.multiplySafely(this.a01, b.a10, mod))%mod;
        let tmp_a01 = (Matrix.multiplySafely(this.a00, b.a01, mod) + Matrix.multiplySafely(this.a01, b.a11, mod))%mod;
        let tmp_a10 = (Matrix.multiplySafely(this.a10, b.a00, mod) + Matrix.multiplySafely(this.a11, b.a10, mod))%mod;
        let tmp_a11 = (Matrix.multiplySafely(this.a10, b.a01, mod) + Matrix.multiplySafely(this.a11, b.a11, mod))%mod;
        
        this.a00 = tmp_a00;
        this.a01 = tmp_a01;
        this.a10 = tmp_a10;
        this.a11 = tmp_a11;
    }
}

function solution(A, B) {
    let result = new Array(A.length);
    for(var i = 0; i < A.length; i++)
    {
        var mod = 1;
        for(let j = 0; j < B[i]; j++, mod *= 2);
            
        let matrix = new Matrix(1, 0, 0, 1);
        let transformer = new Matrix(0, 1, 1, 1);
        for(let j = A[i] - 1; j > 0; j = ~~(j / 2))
        {
            if(j % 2 == 1)
               matrix.multiply(transformer, mod);
            transformer.multiply(transformer, mod);
        }
        
        result[i] = (matrix.a10 + matrix.a11) % mod;
    }
        
    return result;
}