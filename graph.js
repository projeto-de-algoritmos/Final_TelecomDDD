

function calculate_distance(pos1, pos2) {
    return Math.sqrt((pos1.longitude - pos2.longitude) ** 2 + (pos1.latitude - pos2.latitude) ** 2);
}

function Gerar_grafo(cidades , range_cabos) {
    const size = (cidades.length);
    var graph = new Array(size);
    // Zerar matriz de adjacencia
    for (let i = 0; i < size; i++) {
        graph[i] = new Array(size);
        for (let k = 0; k < size; k++) {
            graph[i][k] = Infinity;
        }
    }
    for (let i = 0; i < size; i++) {
        for (let k = 0; k < size; k++) {
            const distance = calculate_distance(cidades[i], cidades[k])
            if (distance <= range_cabos && i != k)
                graph[i][k] = (distance).toFixed(4);
            else
                graph[i][k] = Infinity;
        }
    }
    return graph;
}

function Dijask(initial_index, final_index, graph) {
    var priorityquery = [];
    var visited = [];
    const grafosize = graph.length;
    var set = new Array(grafosize);
    for (let i = 0; i < grafosize; i++) {
        if (graph[initial_index][i] != Infinity)
            priorityquery.push([graph[initial_index][i], i, 0]);
        set[i] = [Infinity, null];
    }
    set[initial_index] = [0, initial_index];
    visited.push(initial_index);
    priorityquery.sort((a, b) => a[0] - b[0]);
    while (priorityquery.length > 0) {
        var current = priorityquery.shift();
        if (current != undefined) {
            if (current[0] != Infinity) {
                if (set[current[1]][0] >= current[0]) {
                    set[current[1]] = [current[0], current[2]];
                }
                if (current[1] == final_index) {
                    return set;
                }
                for (let i = 0; i < grafosize; i++) {
                    if ( graph[current[1]][i] != Infinity && !visited.includes(i) && set[i][0] >= graph[current[1]][i] ) {
                        priorityquery.push([graph[current[1]][i] + set[current[1]][0],i, current[1], ]);
                    }
                }
                for (let i = 0; i < priorityquery.length; i++) {
                    if (priorityquery[i][0] >= set[priorityquery[i][1]][0]) {
                        priorityquery.splice(i, 1);
                    }
                }
            }
            visited.push(current[1]);
            priorityquery.sort((a, b) => a[0] - b[0]);
        }
    }
    if (set[final_index][0] == Infinity) {
        return [];
    }
    return set;
}

export { Gerar_grafo, Dijask };
// distancias em NM
// cada 1NM equivale a 1852m, logo 10NM equivale a 18520m
