import { Gerar_grafo, Dijask ,tamanho_array } from './graph';
import * as cidades from './citys.json';
import { greed } from './Knapsack';
import { type } from 'os';
import { exit } from 'process';

type datetype = {
        start: number,
        finish: number,
        range: number,
        linhas_disponiveis: number,
}

function printcities() {
    console.clear();
    console.log('Cidades:');
    for (let i = 0; i < tamanho_array(cidades); i++) {
        console.log(
            i +
                ' - ' +
                cidades[i].estado +
                ' - ' +
                cidades[i].sigla +
                ' -  DDD:' +
                cidades[i].ddd +
                ' -  Região:' +
                cidades[i].regiao +
                ' -  Quantidade de linhas:' +
                cidades[i].quantidade,
        );
    }
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question('Pressione enter para voltar ao menu', () => {
        readline.close();
        return 0;
    });
    return 0;
}

function inputdata(saida: datetype) {
    console.clear();
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question(
        'Digite o numero da cidade de inicio: ',
        (start: number) => {
            readline.question(
                'Digite o numero da cidade de destino: ',
                (finish: number) => {
                    readline.question(
                        'Digite o alcance do cabo entre as cidades na unidade NM(nautic mile): ',
                        (range: number) => {
                            readline.question(
                                'Digite a quantidade de linhas disponiveis: ',
                                (linhas_disponiveis: number) => {
                                    let dados = {
                                        start: (start),
                                        finish: (finish),
                                        range: (range),
                                        linhas_disponiveis:(linhas_disponiveis),
                                    };
                                    saida = dados;
                                    return dados;
                                },
                            );
                        },
                    );
                },
            );
        },
    );
   return saida
}

function menorcaminho(dijask: number[], start: number, finish: number) {
    var path = [];
    var current = finish;
    while (current != start) {
        path.push(current);
        current = dijask[current];
    }
    path.push(start);
    path.reverse();
    return path;
}



function menu() {
    console.clear()
    let data: datetype = {
        start: 0,
        finish: 0,
        range: 0,
        linhas_disponiveis: 0,
    }
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question("Digite o numero da opção desejada: \n 1 - Ver cidades  \n 2 - Gerar REDE \n 3 - Gerar menor caminho \n 4 - Gerar menor caminho com knapsack \n 5 - Sair", (option: number) => {
        let dados = data;
        let graph = Gerar_grafo(cidades, dados.range);
        let dijask = Dijask(dados.start, dados.finish, graph);
        switch (option) {
            case 1:
                printcities();
                break;
            case 2:
                dados = inputdata(data);
                break;
            case 3:
                graph = Gerar_grafo(cidades, dados.range);
                console.log("Grafo gerado com sucesso!");
                break;
            case 4:
                dijask = Dijask(dados.start, dados.finish, graph);
                console.log("Menor caminho gerado com sucesso!");
                console.log("Menor caminho: " + menorcaminho(dijask, dados.start, dados.finish));
                break;
            case 5:
                // let knapsack = knapSack(dados.linhas_disponiveis, dijask);
                break;
            case 6:
                console.log("Saindo...");
                exit();
            default:
                console.log('Opção invalida');
                menu();
                break;
        }
        menu();
    });
}

menu();
        
