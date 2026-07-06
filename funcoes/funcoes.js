import entradaDados from 'readline-sync';
import listaDeFrutas from "../colecao/dados.js";


function selecionarFruta (){
    const indiceAleatorio = Math.floor(Math.random() * listaDeFrutas.length);
    let palavraEscolhida = listaDeFrutas[indiceAleatorio];
        
    return palavraEscolhida;
}

function criarPalavraOculta (palavraEscolhida) {
    let primeiraLetra = palavraEscolhida[0];
    let underline = '-'.repeat(palavraEscolhida.length - 1);
    let palavraOculta = primeiraLetra + underline;
    
    return palavraOculta;
}

function atualizaPalavraOculta (palavraOculta, letraDigitada, palavraEscolhida){
    let palavraOcultaArray = palavraOculta.split('');

    for(let i = 0; i < palavraEscolhida.length; i++){
        if(letraDigitada === palavraEscolhida[i]){
            palavraOcultaArray[i] = letraDigitada;
        }
    }

    return palavraOcultaArray.join('');

}

function exibirTitulo(palavraEscolhida, palavraOculta){
    console.log('------------JOGO DA FORCA------------\n');
    console.log(`Nome da fruta com ${selecionarFruta().length} letras:`);
    console.log(palavraOculta);
    
}

function inicializaJogo (){
    let palavraEscolhida = selecionarFruta();
    let palavraOculta = criarPalavraOculta(palavraEscolhida);

    exibirTitulo(palavraEscolhida, palavraOculta);

    let letraDigitada = entradaDados.question('\nDigite uma letra: ');

    palavraOculta = atualizaPalavraOculta(palavraOculta, letraDigitada, palavraEscolhida);
    console.log('\nResultado: ');
    console.log(palavraOculta);
    
}

export {exibirTitulo, selecionarFruta, inicializaJogo};