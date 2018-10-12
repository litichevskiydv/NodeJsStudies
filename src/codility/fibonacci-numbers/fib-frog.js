function solution(A) {
    var path = [1].concat(A).concat([1]);
        
        var steps = [1, 2];
        while(steps[steps.length - 1] < path.length)
            steps.push(steps[steps.length - 1] + steps[steps.length - 2]);
            
        var costs = new Array(path.length);
        costs[0] = 0;
        for(var i = 1; i < costs.length; i++)
            costs[i] = Number.MAX_SAFE_INTEGER;
        for(var i = 0; i < costs.length - 1; i++)
        {
            if(path[i] == 0 || costs[i] == Number.MAX_SAFE_INTEGER)
                continue;
            
            for(var j = 0; j < steps.length && i + steps[j] < costs.length; j++)
            {
                if(path[i + steps[j]] == 0)
                    continue;
                
                costs[i + steps[j]] = Math.min(costs[i + steps[j]], costs[i] + 1);
            }
        }
        
        return costs[costs.length - 1] == Number.MAX_SAFE_INTEGER ? -1 : costs[costs.length - 1];
}