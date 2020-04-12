class Solution
{
    class VertexState : IComparable<VertexState>
    {
        public string Vertex { get; }

        public int PathCost { get; }

        public int CompareTo(VertexState obj)
        {
            if (PathCost != obj.PathCost) return PathCost - obj.PathCost;

            return Vertex.CompareTo(obj.Vertex);
        }

        public VertexState(string vertex, int pathCost)
        {
            Vertex = vertex;
            PathCost = pathCost;
        }

        public override string ToString()
        {
            return $"{nameof(Vertex)}: {Vertex}, {nameof(PathCost)}: {PathCost}";
        }
    }

    public static void MaxScore(string[][] travelTimes, string[][] points, string startToken, out int total, out string[] path)
    {
        var pointsDict = new Dictionary<string, int>();
        foreach (var point in points)
            pointsDict[point[0]] = int.Parse(point[1]);

        int? minCost = null;
        var matrix = new Dictionary<string, Dictionary<string, int>>();
        foreach (var travelTime in travelTimes)
        {
            var startVertex = travelTime[0];
            if (!matrix.TryGetValue(startVertex, out var matrixRow))
            {
                matrixRow = new Dictionary<string, int>();
                matrix[startVertex] = matrixRow;
            }


            var endVertex = travelTime[1];
            pointsDict.TryGetValue(endVertex, out var endVertexPoints);

            matrixRow[endVertex] = int.Parse(travelTime[2]) - endVertexPoints;
            if (!minCost.HasValue || minCost.Value > matrixRow[endVertex]) minCost = matrixRow[endVertex];
        }

        if (minCost.Value >= 0) minCost = 0;
        else minCost = -minCost.Value;
        foreach (var (_, matrixRow) in matrix)
            foreach (var to in matrixRow.Keys.ToArray()) matrixRow[to] = matrixRow[to] + minCost.Value;

        var costs = new Dictionary<string, int> {{startToken, 0}};
        var paths = new Dictionary<string, string> {{startToken, "-1"}};
        var states = new SortedSet<VertexState> { new VertexState(startToken, 0) };
        while (states.Count > 0)
        {
            var currentVertex = states.Min;
            states.Remove(currentVertex);

            if (!matrix.ContainsKey(currentVertex.Vertex))
                continue;
            foreach (var (to, cost) in matrix[currentVertex.Vertex])
            {
                var newPathCost = cost + currentVertex.PathCost;

                if (!costs.ContainsKey(to) || costs[to] > newPathCost)
                {
                    if (costs.ContainsKey(to))
                        states.Remove(new VertexState(to, costs[to])); 

                    costs[to] = newPathCost;
                    paths[to] = currentVertex.Vertex;
                    states.Add(new VertexState(to, newPathCost));
                }
            }
        }

        int? bestResult = null;
        string bestEndPoint = null;
        foreach (var (to, cost) in costs)
            if (to.StartsWith("END") && (!bestResult.HasValue || bestResult.Value > cost))
            {
                bestResult = cost;
                bestEndPoint = to;
            }

        var minPath = new List<string>();
        bestResult = bestResult.Value + minCost.Value;
        for (var vertex = bestEndPoint; vertex != "-1"; vertex = paths[vertex])
        {
            minPath.Add(vertex);
            bestResult = bestResult.Value - minCost.Value;
        }
        minPath.Reverse();

        total = -bestResult.Value;
        path = minPath.ToArray();
    }
}