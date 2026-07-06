// Importa a biblioteca readline-sync
// Ela permite receber dados digitados pelo usuário no terminal
import entradaDados from 'readline-sync';

// Importa a lista de frutas que está no arquivo dados.js
import listaDeFrutas from "../colecao/dados.js";


// Função responsável por exibir o título do jogo
function exibirTitulo() {
    console.log('------------JOGO DA FORCA------------\n');
}


// Função responsável por escolher uma fruta aleatória da lista
function selecionarFruta() {
    // Math.random() gera um número aleatório entre 0 e quase 1
    // Multiplicamos pelo tamanho da lista para gerar um índice possível
    // Math.floor() arredonda para baixo, garantindo um número inteiro
    const indiceAleatorio = Math.floor(Math.random() * listaDeFrutas.length);

    // Guarda a fruta sorteada usando o índice aleatório
    const palavraEscolhida = listaDeFrutas[indiceAleatorio];

    // Retorna a fruta escolhida para ser usada no jogo
    return palavraEscolhida;
}


// Função responsável por criar a palavra oculta
// Exemplo: se a palavra for "banana", retorna "b-----"
function criarPalavraOculta(palavraEscolhida) {
    // Pega a primeira letra da palavra escolhida
    const primeiraLetra = palavraEscolhida[0];

    // Cria os traços restantes
    // O -1 acontece porque a primeira letra já será exibida
    const underline = '-'.repeat(palavraEscolhida.length - 1);

    // Junta a primeira letra com os traços
    const palavraOculta = primeiraLetra + underline;

    // Retorna a palavra escondida
    return palavraOculta;
}


// Função responsável por atualizar a palavra oculta
// Exemplo:
// palavraEscolhida = "banana"
// palavraOculta = "b-----"
// letraDigitada = "a"
// resultado = "ba-a-a"
function atualizaPalavraOculta(palavraOculta, letraDigitada, palavraEscolhida) {
    // Transforma a palavra oculta em array
    // Exemplo: "b-----" vira ["b", "-", "-", "-", "-", "-"]
    let palavraOcultaArray = palavraOculta.split('');

    // Percorre cada letra da palavra escolhida
    for (let i = 0; i < palavraEscolhida.length; i++) {

        // Verifica se a letra digitada é igual à letra da posição atual
        if (letraDigitada === palavraEscolhida[i]) {

            // Se for igual, substitui o traço pela letra digitada
            palavraOcultaArray[i] = letraDigitada;
        }
    }

    // Junta o array novamente em formato de texto
    // Exemplo: ["b", "a", "-", "a", "-", "a"] vira "ba-a-a"
    return palavraOcultaArray.join('');
}


// Função responsável por validar se o usuário digitou apenas uma letra
function validaLetraDigitada(letraDigitada) {
    // Expressão regular:
    // ^ significa começo do texto
    // [a-z] significa uma letra de a até z
    // $ significa fim do texto
    //
    // Então /^[a-z]$/ aceita apenas uma única letra minúscula de a até z
    return /^[a-z]$/.test(letraDigitada);
}


// Função responsável por verificar se a letra já foi digitada antes
function verificaLetraJaDigitada(letrasDigitadas, letraDigitada) {
    // includes verifica se a letra digitada já existe dentro da lista letrasDigitadas
    return letrasDigitadas.includes(letraDigitada);
}


// Função principal que executa o jogo
function jogar(palavraEscolhida, palavraOculta) {
    // Controla se o jogo ainda está acontecendo
    let statusJogo = 'andamento';

    // Quantidade de chances que o jogador tem
    let chances = 4;

    // Conta quantas vezes o jogador errou
    let tentativasErradas = 0;

    // Lista que guarda todas as letras já digitadas pelo jogador
    let letrasDigitadas = [];

    // Exibe o título do jogo
    exibirTitulo();

    // Mostra a quantidade de letras da fruta
    console.log(`Nome da fruta com ${palavraEscolhida.length} letras:`);

    // O while mantém o jogo rodando enquanto o status for "andamento"
    while (statusJogo === 'andamento') {
        // Mostra as chances restantes
        console.log(`\nChances restantes: ${chances}`);

        // Mostra a palavra oculta atual
        console.log('Palavra: ' + palavraOculta);

        // Se já existir alguma letra digitada, mostra para o usuário
        if (letrasDigitadas.length > 0) {
            console.log('Letras já digitadas: ' + letrasDigitadas.join(', '));
        }

        // Pede uma letra para o usuário
        // trim() remove espaços antes e depois
        // toLowerCase() transforma em letra minúscula
        const letraDigitada = entradaDados
            .question("Digite uma letra: ")
            .trim()
            .toLowerCase();

        // Verifica se o usuário digitou uma letra válida
        if (!validaLetraDigitada(letraDigitada)) {
            console.log('Digite somente uma letra válida de A-Z, sem números ou sequência de letras.');

            // continue faz o while voltar para o começo
            // Assim o usuário digita novamente sem perder chance
            continue;
        }

        // Verifica se a letra já foi digitada antes
        if (verificaLetraJaDigitada(letrasDigitadas, letraDigitada)) {
            console.log('Você já digitou essa letra!');

            // Volta para o começo do while sem perder chance
            continue;
        }

        // Se a letra passou nas validações, adiciona na lista de letras digitadas
        letrasDigitadas.push(letraDigitada);

        // Verifica se a palavra escolhida contém a letra digitada
        if (palavraEscolhida.includes(letraDigitada)) {

            // Atualiza a palavra oculta, revelando a letra correta
            palavraOculta = atualizaPalavraOculta(
                palavraOculta,
                letraDigitada,
                palavraEscolhida
            );

            console.log('Boa! A letra digitada existe na palavra.');

        } else {
            // Se a letra não existir na palavra, o jogador perde uma chance
            chances--;

            // Soma uma tentativa errada
            tentativasErradas++;

            console.log('Que pena! Letra errada.');
            console.log(`Você errou ${tentativasErradas} vez(es).`);
        }

        // Verifica se o jogador venceu
        // Isso acontece quando a palavra oculta fica igual à palavra escolhida
        if (palavraOculta === palavraEscolhida) {
            statusJogo = 'VENCEU';

        // Verifica se o jogador perdeu
        // Isso acontece quando as chances chegam a zero
        } else if (chances === 0) {
            statusJogo = 'PERDEU';
        }
    }

    // Quando o while termina, mostra o resultado final
    if (statusJogo === 'VENCEU') {
        console.log('\nPARABÉNS, VOCÊ VENCEU!');
        console.log(`A palavra era: ${palavraEscolhida}`);
    } else {
        console.log('\nNão foi desta vez! Tente novamente!');
        console.log(`A palavra era: ${palavraEscolhida}`);
    }
}


// Função responsável por preparar e iniciar o jogo
function inicializaJogo() {
    // Sorteia uma fruta
    const palavraEscolhida = selecionarFruta();

    // Cria a palavra oculta com base na fruta sorteada
    const palavraOculta = criarPalavraOculta(palavraEscolhida);

    // Chama a função que executa o jogo
    jogar(palavraEscolhida, palavraOculta);
}


// Exporta somente a função inicializaJogo
// O index.js só precisa conhecer essa função
export { inicializaJogo };