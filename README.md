# Jogo da Forca em JavaScript

Projeto simples de **Jogo da Forca no terminal**, desenvolvido em **JavaScript com Node.js**, usando a biblioteca `readline-sync` para receber dados digitados pelo usuário.

O objetivo do jogo é adivinhar o nome de uma fruta antes que as chances acabem.

---

## Tecnologias utilizadas

- JavaScript
- Node.js
- readline-sync
- Módulos ES6 com `import` e `export`

---

## Estrutura do projeto

```text
jogo-da-forca/
│
├── index.js
│
├── funcoes/
│   └── funcoes.js
│
└── colecao/
    └── dados.js
```

---

## Descrição dos arquivos

### `index.js`

Arquivo principal do projeto.

Ele é responsável apenas por importar e executar a função que inicia o jogo.

```javascript
import { inicializaJogo } from './funcoes/funcoes.js';

inicializaJogo();
```

---

### `funcoes/funcoes.js`

Arquivo onde ficam as principais funções do jogo.

Ele contém funções para:

- Exibir o título do jogo.
- Sortear uma fruta.
- Criar a palavra oculta.
- Validar a letra digitada.
- Verificar letras repetidas.
- Atualizar a palavra oculta.
- Controlar o funcionamento do jogo.

---

### `colecao/dados.js`

Arquivo onde fica a lista de frutas usadas no jogo.

Exemplo:

```javascript
const listaDeFrutas = [
    "banana",
    "maca",
    "uva",
    "laranja",
    "abacaxi"
];

export default listaDeFrutas;
```

---

## Como instalar o projeto

Primeiro, crie a pasta do projeto e entre nela:

```bash
mkdir jogo-da-forca
cd jogo-da-forca
```

Depois, inicie o projeto Node.js:

```bash
npm init -y
```

Instale a biblioteca `readline-sync`:

```bash
npm install readline-sync
```

No arquivo `package.json`, adicione:

```json
"type": "module"
```

Exemplo de `package.json`:

```json
{
  "name": "jogo-da-forca",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "readline-sync": "^1.4.10"
  }
}
```

---

## Como executar o jogo

No terminal, execute:

```bash
node index.js
```

Ou, se você configurou o script `start` no `package.json`:

```bash
npm start
```

---

# Como o jogo funciona

O jogo começa sorteando uma fruta aleatória da lista.

Depois, ele mostra:

- O título do jogo.
- A quantidade de letras da fruta.
- A primeira letra da fruta.
- Traços representando as letras ocultas.
- A quantidade de chances restantes.

Exemplo:

```text
------------JOGO DA FORCA------------

Nome da fruta com 6 letras:

Chances restantes: 4
Palavra: b-----
Digite uma letra:
```

Se a palavra sorteada for `banana`, o jogo começa mostrando:

```text
b-----
```

A primeira letra aparece, e o restante fica oculto.

---

## Exemplo de jogo em tela

```text
------------JOGO DA FORCA------------

Nome da fruta com 6 letras:

Chances restantes: 4
Palavra: b-----
Digite uma letra: a
Boa! A letra digitada existe na palavra.

Chances restantes: 4
Palavra: ba-a-a
Letras já digitadas: a
Digite uma letra: n
Boa! A letra digitada existe na palavra.

PARABÉNS, VOCÊ VENCEU!
A palavra era: banana
```

---

## Exemplo quando o jogador erra

```text
------------JOGO DA FORCA------------

Nome da fruta com 6 letras:

Chances restantes: 4
Palavra: b-----
Digite uma letra: x
Que pena! Letra errada.
Você errou 1 vez(es).

Chances restantes: 3
Palavra: b-----
Letras já digitadas: x
Digite uma letra:
```

A cada erro, o jogador perde uma chance.

---

## Exemplo quando o jogador digita algo inválido

```text
Digite uma letra: ab
Digite somente uma letra válida de A-Z, sem números ou sequência de letras.
```

O jogador não perde chance quando digita algo inválido.

Entradas inválidas:

```text
ab
123
a1
@
espaço vazio
```

Entradas válidas:

```text
a
b
c
z
```

---

## Exemplo quando o jogador repete uma letra

```text
Digite uma letra: a
Boa! A letra digitada existe na palavra.

Digite uma letra: a
Você já digitou essa letra!
```

O jogador também não perde chance ao repetir uma letra já digitada.

---

# Documento de componentes

## 1. Componente principal: `index.js`

### Responsabilidade

Iniciar o jogo.

### Código

```javascript
import { inicializaJogo } from './funcoes/funcoes.js';

inicializaJogo();
```

### Explicação

O `index.js` é o ponto de entrada do programa.

Ele importa a função `inicializaJogo()` e executa essa função.

---

## 2. Componente de dados: `dados.js`

### Responsabilidade

Guardar a lista de frutas que podem ser sorteadas.

### Código

```javascript
const listaDeFrutas = [
    "banana",
    "maca",
    "uva",
    "laranja",
    "abacaxi"
];

export default listaDeFrutas;
```

### Explicação

Esse arquivo funciona como uma coleção de dados.

Sempre que o jogo começa, uma fruta dessa lista é escolhida aleatoriamente.

---

## 3. Função `exibirTitulo()`

### Responsabilidade

Mostrar o título inicial do jogo.

### Código

```javascript
function exibirTitulo() {
    console.log('------------JOGO DA FORCA------------\n');
}
```

### Saída esperada

```text
------------JOGO DA FORCA------------
```

---

## 4. Função `selecionarFruta()`

### Responsabilidade

Sortear uma fruta aleatória da lista.

### Código

```javascript
function selecionarFruta() {
    const indiceAleatorio = Math.floor(Math.random() * listaDeFrutas.length);
    return listaDeFrutas[indiceAleatorio];
}
```

### Como funciona

A função usa:

```javascript
Math.random()
```

para gerar um número aleatório.

Depois usa:

```javascript
Math.floor()
```

para transformar esse número em um índice válido do array.

Exemplo:

```javascript
listaDeFrutas[0] // banana
listaDeFrutas[1] // maca
listaDeFrutas[2] // uva
```

---

## 5. Função `criarPalavraOculta()`

### Responsabilidade

Criar a palavra escondida que aparece para o jogador.

### Código

```javascript
function criarPalavraOculta(palavraEscolhida) {
    const primeiraLetra = palavraEscolhida[0];
    const underline = '-'.repeat(palavraEscolhida.length - 1);

    return primeiraLetra + underline;
}
```

### Exemplo

Entrada:

```javascript
"banana"
```

Saída:

```text
b-----
```

A primeira letra aparece, e as demais ficam ocultas com `-`.

---

## 6. Função `atualizaPalavraOculta()`

### Responsabilidade

Atualizar a palavra oculta quando o jogador acerta uma letra.

### Código

```javascript
function atualizaPalavraOculta(palavraOculta, letraDigitada, palavraEscolhida) {
    let palavraOcultaArray = palavraOculta.split('');

    for (let i = 0; i < palavraEscolhida.length; i++) {
        if (letraDigitada === palavraEscolhida[i]) {
            palavraOcultaArray[i] = letraDigitada;
        }
    }

    return palavraOcultaArray.join('');
}
```

### Exemplo

Valores:

```javascript
palavraEscolhida = "banana"
palavraOculta = "b-----"
letraDigitada = "a"
```

Resultado:

```text
ba-a-a
```

---

## 7. Função `validaLetraDigitada()`

### Responsabilidade

Validar se o usuário digitou apenas uma letra válida.

### Código

```javascript
function validaLetraDigitada(letraDigitada) {
    return /^[a-z]$/.test(letraDigitada);
}
```

### Regras

Aceita:

```text
a
b
c
z
```

Não aceita:

```text
ab
123
a1
@
```

---

## 8. Função `verificaLetraJaDigitada()`

### Responsabilidade

Verificar se o jogador já tentou aquela letra antes.

### Código

```javascript
function verificaLetraJaDigitada(letrasDigitadas, letraDigitada) {
    return letrasDigitadas.includes(letraDigitada);
}
```

### Exemplo

```javascript
let letrasDigitadas = ["a", "e", "o"];

verificaLetraJaDigitada(letrasDigitadas, "a");
```

Resultado:

```javascript
true
```

---

## 9. Função `jogar()`

### Responsabilidade

Controlar toda a lógica principal do jogo.

Ela controla:

- Status do jogo.
- Chances restantes.
- Tentativas erradas.
- Letras já digitadas.
- Entrada do usuário.
- Vitória.
- Derrota.

### Principais variáveis

```javascript
let statusJogo = 'andamento';
let chances = 4;
let tentativasErradas = 0;
let letrasDigitadas = [];
```

### Explicação das variáveis

| Variável | Função |
|---|---|
| `statusJogo` | Controla se o jogo continua, venceu ou perdeu |
| `chances` | Guarda quantas chances o jogador ainda tem |
| `tentativasErradas` | Conta quantas vezes o jogador errou |
| `letrasDigitadas` | Guarda as letras já digitadas |

---

## 10. Função `inicializaJogo()`

### Responsabilidade

Preparar o jogo e chamar a função principal.

### Código

```javascript
function inicializaJogo() {
    const palavraEscolhida = selecionarFruta();
    const palavraOculta = criarPalavraOculta(palavraEscolhida);

    jogar(palavraEscolhida, palavraOculta);
}
```

### Como funciona

Essa função:

1. Sorteia uma fruta.
2. Cria a palavra oculta.
3. Inicia o jogo.

---

# Fluxo do jogo

```text
Início
  |
  v
Sorteia uma fruta
  |
  v
Cria palavra oculta
  |
  v
Exibe título e quantidade de letras
  |
  v
Usuário digita uma letra
  |
  v
A letra é válida?
  |
  ├── Não -> mostra mensagem e pede novamente
  |
  └── Sim
        |
        v
A letra já foi digitada?
        |
        ├── Sim -> mostra mensagem e pede novamente
        |
        └── Não
              |
              v
A letra existe na palavra?
              |
              ├── Sim -> atualiza palavra oculta
              |
              └── Não -> perde uma chance
                        |
                        v
Palavra completa?
              |
              ├── Sim -> jogador venceu
              |
              └── Não
                    |
                    v
Chances acabaram?
              |
              ├── Sim -> jogador perdeu
              |
              └── Não -> continua o jogo
```

---

# Código completo sugerido

## `index.js`

```javascript
import { inicializaJogo } from './funcoes/funcoes.js';

inicializaJogo();
```

---

## `funcoes/funcoes.js`

```javascript
import entradaDados from 'readline-sync';
import listaDeFrutas from "../colecao/dados.js";

function exibirTitulo() {
    console.log('------------JOGO DA FORCA------------\n');
}

function selecionarFruta() {
    const indiceAleatorio = Math.floor(Math.random() * listaDeFrutas.length);
    return listaDeFrutas[indiceAleatorio];
}

function criarPalavraOculta(palavraEscolhida) {
    const primeiraLetra = palavraEscolhida[0];
    const underline = '-'.repeat(palavraEscolhida.length - 1);

    return primeiraLetra + underline;
}

function atualizaPalavraOculta(palavraOculta, letraDigitada, palavraEscolhida) {
    let palavraOcultaArray = palavraOculta.split('');

    for (let i = 0; i < palavraEscolhida.length; i++) {
        if (letraDigitada === palavraEscolhida[i]) {
            palavraOcultaArray[i] = letraDigitada;
        }
    }

    return palavraOcultaArray.join('');
}

function validaLetraDigitada(letraDigitada) {
    return /^[a-z]$/.test(letraDigitada);
}

function verificaLetraJaDigitada(letrasDigitadas, letraDigitada) {
    return letrasDigitadas.includes(letraDigitada);
}

function jogar(palavraEscolhida, palavraOculta) {
    let statusJogo = 'andamento';
    let chances = 4;
    let tentativasErradas = 0;
    let letrasDigitadas = [];

    exibirTitulo();

    console.log(`Nome da fruta com ${palavraEscolhida.length} letras:`);

    while (statusJogo === 'andamento') {
        console.log(`\nChances restantes: ${chances}`);
        console.log('Palavra: ' + palavraOculta);

        if (letrasDigitadas.length > 0) {
            console.log('Letras já digitadas: ' + letrasDigitadas.join(', '));
        }

        const letraDigitada = entradaDados
            .question("Digite uma letra: ")
            .trim()
            .toLowerCase();

        if (!validaLetraDigitada(letraDigitada)) {
            console.log('Digite somente uma letra válida de A-Z, sem números ou sequência de letras.');
            continue;
        }

        if (verificaLetraJaDigitada(letrasDigitadas, letraDigitada)) {
            console.log('Você já digitou essa letra!');
            continue;
        }

        letrasDigitadas.push(letraDigitada);

        if (palavraEscolhida.includes(letraDigitada)) {
            palavraOculta = atualizaPalavraOculta(
                palavraOculta,
                letraDigitada,
                palavraEscolhida
            );

            console.log('Boa! A letra digitada existe na palavra.');
        } else {
            chances--;
            tentativasErradas++;

            console.log('Que pena! Letra errada.');
            console.log(`Você errou ${tentativasErradas} vez(es).`);
        }

        if (palavraOculta === palavraEscolhida) {
            statusJogo = 'VENCEU';
        } else if (chances === 0) {
            statusJogo = 'PERDEU';
        }
    }

    if (statusJogo === 'VENCEU') {
        console.log('\nPARABÉNS, VOCÊ VENCEU!');
        console.log(`A palavra era: ${palavraEscolhida}`);
    } else {
        console.log('\nNão foi desta vez! Tente novamente!');
        console.log(`A palavra era: ${palavraEscolhida}`);
    }
}

function inicializaJogo() {
    const palavraEscolhida = selecionarFruta();
    const palavraOculta = criarPalavraOculta(palavraEscolhida);

    jogar(palavraEscolhida, palavraOculta);
}

export { inicializaJogo };
```

---

## `colecao/dados.js`

```javascript
const listaDeFrutas = [
    "banana",
    "maca",
    "uva",
    "laranja",
    "abacaxi",
    "melancia",
    "morango",
    "pera"
];

export default listaDeFrutas;
```

---

# Possíveis melhorias futuras

- Adicionar opção para jogar novamente.
- Adicionar níveis de dificuldade.
- Adicionar mais categorias além de frutas.
- Mostrar desenho da forca conforme os erros.
- Permitir palavras com acento.
- Separar mensagens do jogo em outro arquivo.
- Criar placar de vitórias e derrotas.
- Limpar a tela a cada rodada.
- Criar testes para as funções principais.

---

# Status do projeto

Projeto em desenvolvimento para fins de estudo de JavaScript, funções, arrays, loops, validações e entrada de dados pelo terminal.