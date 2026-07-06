import listaDeFrutas from "../colecao/dados.js";


function selecionarFruta (){
    const indiceAleatorio = Math.floor(Math.random() * listaDeFrutas.length);
    return listaDeFrutas[indiceAleatorio];
}

function exibirTitulo(){
    console.log('------------JOGO DA FORCA------------\n');
    console.log(`Nome da fruta com ${selecionarFruta().length} letras:`);
    
}

function inicilizaJogo (){
    exibirTitulo();
}

export {exibirTitulo, selecionarFruta, inicilizaJogo};