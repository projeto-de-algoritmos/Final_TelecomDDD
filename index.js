import { Gerar_grafo, Dijask } from './graph.js';
import PromptSync from 'prompt-sync';
import  cidades from './citys.js';

const input = PromptSync({ sigint: true });

function changing(dijska, linhas_disponiveis) {
    let change = [];
    for (let i = 0; i < dijska.length; i++) {
        change.push(cidades[dijska[i][0]]);
    }
    let data = change.sort((a, b) => b.quantidade - a.quantidade);
    let result = [];
    let sum = 0;
    let i = 0;
    for (i = 0; i < data.length; i++) {
        if (sum + data[i].quantidade <= linhas_disponiveis) {
            sum += data[i].quantidade;
            result.push(data[i]);
            linhas_disponiveis -= data[i].quantidade;
        }
        if (sum == linhas_disponiveis) break;
    }
    return result;
}


function printcities() {
    console.clear();
    console.log('Cidades:');
    console.table(cidades);

    input("Pressione para voltar para o menu");
    return 0;
}

function inputdata() {
    console.clear();

    let start = input('Digite o DDD da cidade de inicio: ');
    let finish =   input('Digite o DDD da cidade de destino: ');
    let range =  input('Digite o alcance do cabo entre as cidades km: ');
    let quantidade = input('Digite a quantidade de linhas disponiveis: ');
    
    let data = {
        start: Number(start),
        finish: Number(finish),
        range: Number(range),
        quantidade: Number(quantidade),
    };

    return data;
};

function menu() {
    console.clear()
    let dados = {
        start: 11,
        finish: 21,
        range: 350, 
        quantidade: 0,
    };
    let option = 0;
    while (option != 5) {
        console.log("Digite o numero da opção desejada: \n 1 - Ver cidades  \n 2 - Inserir dados \n 3 - Gerar caminho de menor custo\n 4 - Escolher cidades para instalar antena \n 5 - Sair");
        option = Number(input(""));
        let graph = [];
        let dijask = [];
        let result = [];
        switch (option) {
            case 1:
                printcities();
                break;
            case 2:
                dados = inputdata();
                console.table(dados);
                break;
            case 3:
                graph = Gerar_grafo(cidades, dados.range);
                dijask = Dijask(cidades.indexOf(cidades.find(elemento => elemento.ddd == dados.start)), cidades.indexOf(cidades.find(elemento => elemento.ddd == dados.finish)), graph);
                if (dijask.length > 1) {
                    console.log("Menor caminho gerado com sucesso!");
                    console.log("A quantidade de cabos necessarios é: " + parseFloat(dijask[(dijask.length - 1)][1]).toFixed(2) + " km");
                    let string = ""
                    for (let i = 0; i < dijask.length; i++) {
                        string = string + 'Estado: ' + cidades[dijask[i][0]].sigla + " DDD: " + cidades[dijask[i][0]].ddd;
                        result.push(cidades[dijask[i][0]]);
                        if(i != dijask.length - 1){
                            string += " -> ";
                        }
                    }
                    console.log(string);
                }
                else
                    console.log("Não foi possivel encontrar um caminho com as restrições impostas!");
                break;
            case 4:
                graph = Gerar_grafo(cidades, dados.range);
                dijask = Dijask(cidades.indexOf(cidades.find(elemento => elemento.ddd == dados.start)), cidades.indexOf(cidades.find(elemento => elemento.ddd == dados.finish)), graph);
                let change = changing(dijask, dados.quantidade);
                if (change.length > 0) {
                    console.log("Cidades que devem ser cobertas:");
                    for (let i = 0; i < change.length; i++) {
                        console.log('Estado: ' + change[i].sigla + " DDD: " + change[i].ddd + " -> " + "Quantidade de linhas: " + change[i].quantidade + " ");
                    }
                }
                else 
                    console.log("Nenhuma cidade deve ser coberta!");
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
        
