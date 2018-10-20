class Point{
    constructor(coordinate, pointType, number){
        this.coordinate = coordinate;
        this.pointType = pointType;
        this.number = number;
    }
}

function check(points, planksCount, nailsCount){
    let secured = [];
    for(let i = 0; i < planksCount; i++)
        secured.push(0);
        
    let activeNumbers = [];
    for(let point of points){
        if(point.pointType === 1)
            activeNumbers.push(point.number);
        else if(point.pointType === 2 && point.number < nailsCount) {
            for(let activeNumber of activeNumbers)
                secured[activeNumber] = 1;
            activeNumbers = [];
        }
        else if(point.pointType === 3 && secured[point.number] === 0)
            return false;
    }
    
    return true;
}

function solution(A, B, C) {
    let points = [];
    A.forEach((x, i) => points.push(new Point(x, 1, i)));
    C.forEach((x, i) => points.push(new Point(x, 2, i)));
    B.forEach((x, i) => points.push(new Point(x, 3, i)));
    points = points.sort((x, y) => {
        if(x.coordinate !== y.coordinate) return x.coordinate - y.coordinate;
        return x.pointType - y.pointType;
    });
    
    var left = 1;
    var right = C.length + 1;
    while(right - left > 0){
        var current = (right + left) >> 1;
        if(check(points, A.length, current) === false)
            left = current + 1;
        else
            right = current;
    }
        
    return right === C.length + 1 ? -1 : right;
}