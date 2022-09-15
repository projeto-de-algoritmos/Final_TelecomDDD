import { Gerar_grafo, Dijask } from './graph.js';
import PromptSync from 'prompt-sync';
import  cidades from './citys.js';
import { resolve } from './knapsack.js';

const input = PromptSync({ sigint: true });

function printcities() {
    console.clear();
    console.log('Cidades:');
    // for (let i = 0; i < cidades.length; i++) {
    //     console.log(
    //         i +
    //             ' - ' +
    //             cidades[i].estado +
    //             ' - ' +
    //             cidades[i].sigla +
    //             ' -  DDD:' +
    //             cidades[i].ddd +
    //             ' -  Região:' +
    //             cidades[i].regiao +
    //             ' -  Quantidade de linhas:' +
    //             cidades[i].quantidade,
    //     );
    // }
    console.table(cidades);

    const response = input("Pressione para voltar para o menu");
    return 0;
}

function inputdata(dados) {
    console.clear();

    let start = input('Digite o numero da cidade de inicio: ');
    let finish =   input('Digite o numero da cidade de destino: ');
    let range =  input('Digite o alcance do cabo entre as cidades na unidade NM(nautic mile): ');
    let quantidade = input('Digite a quantidade de linhas disponiveis: ');
    
    let data = {
        start: Number(start),
        finish: Number(finish),
        range: Number(range),
        quantidade: Number(quantidade),
    };

    dados = {...data};
    return dados;
};

function menorcaminho(dijask, start, finish) {
    var path = [];
    var current = finish;
    while (current != start) {
        path.push(current);
        current = dijask[current][1];
    }
    path.push(start);
    path.reverse();
    return path;
}

function menu() {
    console.clear()
    let dados = {
        start: 0,
        finish: 0,
        range: 0, 
        quantidade: 0,
    };
    let option = 0;
    while (option != 5) {
        console.log("Digite o numero da opção desejada: \n 1 - Ver cidades  \n 2 - Inserir dados \n 3 - Gerar menor caminho \n 4 - Gerar menor caminho com knapsack \n 5 - Sair");
        option = Number(input(""));
        let graph = [];
        let dijask = [];
    
        switch (option) {
            case 1:
                printcities();
                break;
            case 2:
                dados = inputdata(dados);
                console.table(dados);
                break;
            case 3:
                graph = Gerar_grafo(cidades, dados.range);
                console.log("Grafo gerado com sucesso!");
                dijask = Dijask(dados.start, dados.finish, graph);
                console.log("Menor caminho gerado com sucesso!");
                console.log("Menor caminho: " + menorcaminho(dijask, dados.start, dados.finish));
                console.log("O menor caminho é");
                let string = ""
                let menor = menorcaminho(dijask, dados.start, dados.finish);
                for (let i = 0; i < menor.length; i++) {
                    string =  string + 'Estado: ' + cidades[menor[i]].sigla + " DDD: " + cidades[menor[i]].ddd + " -> " ;
                }
                console.log(string);
                break;
            case 4:
                graph = Gerar_grafo(cidades, dados.range);
                dijask = Dijask(dados.start, dados.finish, graph);
                let knapsack = resolve(dados.quantidade, dijask);
                break;
            case 5:
                console.log("Saindo...");
            default:
                console.log('Opção invalida');
                break;
        }
    }
    

}

menu();
        
