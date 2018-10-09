function gcd(a, b) {
    return b ? gcd (b, a % b) : a;
}

function solution(N, M) {
    return N / gcd(N, M);
}