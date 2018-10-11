function gcd(a, b) {
    return b ? gcd (b, a % b) : a;
}

function check(maxDivisor, value) {
    for(var i = gcd(maxDivisor, value); i != 1; i = gcd(maxDivisor, value))
        while(value % i == 0)
            value /= i;
    return value === 1;
}

function solution(A, B) {
    var result = 0;
    for(var i = 0; i < A.length; i++) {
        var maxDivisor = gcd(A[i], B[i]);
        if(check(maxDivisor, A[i]) && check(maxDivisor, B[i]))
            result++;
    }
        
    return result;
}