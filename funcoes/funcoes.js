import listaDeFrutas from "../colecao/colecao.js";



function exibirTitulo(){
    console.log('-----JOGO DA FORCA-----\n');
}

function selecionarFruta (){
    const indiceAleatorio = Math.floor(Math.random() * listaDeFrutas.length);
    return listaDeFrutas[indiceAleatorio];
}


function inicilizaJogo (){
    exibirTitulo();
    console.log(selecionarFruta());
}

export {exibirTitulo, selecionarFruta, inicilizaJogo};