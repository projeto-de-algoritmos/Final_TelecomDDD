
function knapsack(data, linhas_disponiveis) {
    var M = Array.from(Array(data.length+1), () => new Array(linhas_disponiveis).fill(0));
        for (let i = 1; i < data.length; i++) {
            for (let w = 1;w< linhas_disponiveis; w++) {
                if (data[i].quantidade > w) {
                    M[i][w] = M[i-1][w];
                } else {
                    M[i][w] = Math.max(M[i-1][w], M[i-1][w-data[i].quantidade] + 2*data[i].quantidade);
                }
            }
        }
    return [M[data.length - 1][linhas_disponiveis - 1], M];
}
function resolve(data, linhas_disponiveis) {
    const [max, M] = knapsack(data, linhas_disponiveis);
    let w = linhas_disponiveis - 1;
    let i = data.length - 1;
    let zonas = [];
    while (i > 0) {
        if (M[i][w] !== M[i - 1][w]) {
            zonas.push(data[i].ddd);
            w = w - data[i].quantidade;
        }
        i = i - 1;
    }
    return zonas;
}

export {resolve};