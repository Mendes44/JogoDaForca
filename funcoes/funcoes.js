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


function validaLetraDigitada (letraDigitada) {
    if(letraDigitada.length === 1 && letraDigitada.match(/[a-z]/)){
        return true;
    }else{
        return false;
    }
}

function verificaPalavraJaDigitada (letrasDigitadas, letraDigitada){
    return letrasDigitadas.includes(letraDigitada);
}

function exibirTitulo(palavraEscolhida, palavraOculta){
    let statusJogo = 'andamento';
    let chances = 4;
    let tentativasErradas = 0;
    let letrasDigitadas = [];

    console.log('------------JOGO DA FORCA------------\n');
    console.log(`Nome da fruta com ${palavraEscolhida.length} letras:`);
    
    
    while(statusJogo === 'andamento'){
        console.log(`Chances Restantes: ${chances}`);
        console.log('\nPalavra: ' + palavraOculta);


        const letraDigitada = entradaDados.question("Digite uma letra: ").toLocaleLowerCase();
        
        if(!validaLetraDigitada(letraDigitada)){
            console.log('DIGITE SOMENTE UMA LETRA VALIDA DE A-Z SEM NUMEROS OU SEGUENCIA DE LETRAS!!!');
            continue;
        }

        if(verificaPalavraJaDigitada(letrasDigitadas, letraDigitada)){
            console.log('VOCE JA DIGITOU ESSA LETRA!!!');
            continue;
        }

        letrasDigitadas.push(letraDigitada);

        if(palavraEscolhida.includes(letraDigitada)){
            palavraOculta = atualizaPalavraOculta(palavraOculta, letraDigitada, palavraEscolhida);
            console.log('BOA!!! A letra digitada existe na palavra!');
        }else{
            chances--;
            tentativasErradas++
            console.log('QUE PENA!!! Letra Errada! Voce perdeu ' + tentativasErradas + ' tentativas.');            
        }

        if (palavraOculta === palavraEscolhida){
            statusJogo = 'VENCEU';
        }else if (chances === 0){
            statusJogo = 'PERDEU';

        }

        if (statusJogo === 'VENCEU'){
            console.log('\nPARABENS VOCE VENCEU!');
            console.log(`A Palavra era: ${palavraEscolhida}`);
        }else if (statusJogo === 'PERDEU'){
            console.log('\nNao foi desta vez! Tente Novamente!');
            console.log(`A Palavra era: ${palavraEscolhida}`);
        }
    }
}


function inicializaJogo (){
    let palavraEscolhida = selecionarFruta();
    let palavraOculta = criarPalavraOculta(palavraEscolhida);

    exibirTitulo(palavraEscolhida, palavraOculta);
}

export {exibirTitulo, selecionarFruta, inicializaJogo};