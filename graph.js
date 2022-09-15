
function calculate_distance(pos1, pos2) {
    const lon = (parseInt(pos1.longitude) - parseInt(pos2.longitude)) * 60 + (pos1.longitude - parseInt(pos1.longitude)) - (pos2.longitude - parseInt(pos2.longitude));
    const lat = (parseInt(pos1.latitude) - parseInt(pos2.latitude)) * 60 + (pos1.latitude - parseInt(pos1.latitude)) - (pos2.latitude - parseInt(pos2.latitude));
    return (Math.sqrt((lon) ** 2 + (lat) ** 2));
}


// function calculate_distance(pos1, pos2) {
//     var graus_radiano = function (deg) { deg * (Math.PI / 180); };
//     var R = 6371; // Raio da Terra em km
//     var dLat = graus_radiano(pos2.latitude - pos1.latitude);
//     var dLon = graus_radiano(pos2.longitude - pos1.longitude);
//     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(graus_radiano(pos1.latitude)) * Math.cos(graus_radiano(pos2.latitude)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     var d = R * c;
//     return d;
// }

function Gerar_grafo(cidades, range_cabos) {
    const size = cidades.length;
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
                 graph[i][k] = parseFloat((distance).toFixed(2));
            else
                graph[i][k] = Infinity;
        }
    }
    return graph;
}

function Dijask(initial_index, final_index, graph) {
    let size = graph.length;
    var result = new Array(size);
    var dist = new Array(size);
    var prev = new Array(size);
    var visited = new Array(size);
    for (let i = 0; i < size; i++) {
        dist[i] = Infinity;
        prev[i] = null;
        visited[i] = false;
    }
    dist[initial_index] = 0;
    for (let i = 0; i < size; i++) {
        let min = Infinity;
        let u = 0;
        for (let k = 0; k < size; k++) {
            if (visited[k] == false && dist[k] < min) {
                min = dist[k];
                u = k;
            }
        }
        visited[u] = true;
        for (let k = 0; k < size; k++) {
            if (visited[k] == false && graph[u][k] != Infinity && (dist[u] + graph[u][k]) < dist[k]) {
                dist[k] = dist[u] + graph[u][k];
                prev[k] = u;
            }
        }
    }
    let path = [];
    let u = final_index;
    while (prev[u] != null) {
        path.push(u);
        u = prev[u];
    }
    path.push(u);
    result = new Array(path.length);
    for (let i = 0; i < path.length; i++) {
        result[i] = new Array(2);
        result[i][0] = path[i];
        result[i][1] = dist[path[i]];
    }
    return result.reverse();
}

// console.log(Dijask(0, 20, Gerar_grafo(cidades, 350)));
// console.table(Gerar_grafo(cidades, 350));
export { Gerar_grafo, Dijask };
