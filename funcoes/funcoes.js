import listaDeFrutas from "../colecao/dados.js";


function selecionarFruta (){
    const indiceAleatorio = Math.floor(Math.random() * listaDeFrutas.length);
    let palavraEscolhida = listaDeFrutas[indiceAleatorio];
    let primeiraLetra = palavraEscolhida[0];
    let underline = '-'.repeat(palavraEscolhida.length - 1);
    let palavraOculta = primeiraLetra + underline;
    
    return palavraOculta;
}

function exibirTitulo(){
    console.log('------------JOGO DA FORCA------------\n');
    console.log(`Nome da fruta com ${selecionarFruta().length} letras:`);
    
}

function inicilizaJogo (){
    exibirTitulo();
}

export {exibirTitulo, selecionarFruta, inicilizaJogo};