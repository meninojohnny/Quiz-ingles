var palavras = [];
var palavraSorteada = {};
var alternativas = [];
var jogoRodando = true;

async function carregarDados() {
    var resposta = await fetch("dados.json");
    palavras = await resposta.json();
    jogar();
}

function sortearPalavra() {
    palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];
    document.querySelector(".palavra").innerHTML = `<h2>${palavraSorteada["palavra"]}</h2>`;
}

function gerarAlternativas() {
    alternativas.push(palavraSorteada["traducao"])
    for (var i = 0; i < 3; i++) {
        var valido = true;
        while (valido) {
            var palavra = palavras[Math.floor(Math.random() * palavras.length)]["traducao"]
            if (!alternativas.includes(palavra)) {
                valido = false;
            }
        }
        alternativas.push(palavra);
    }
}

function embaralharAlternativas() {
    for (let i = alternativas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alternativas[i], alternativas[j]] = [alternativas[j], alternativas[i]];
    }
}

function gerarBotoes() {
    var row1 = document.querySelector(".row1");
    var row2 = document.querySelector(".row2");
    row1.innerHTML = "";
    row2.innerHTML = "";
    row1.innerHTML += `<div onclick="selecionar(id)" id=${alternativas[0]} class="btn-alternativa">${alternativas[0]}</div>`;
    row1.innerHTML += `<div onclick="selecionar(id)" id=${alternativas[1]} class="btn-alternativa">${alternativas[1]}</div>`;
    row2.innerHTML += `<div onclick="selecionar(id)" id=${alternativas[2]} class="btn-alternativa">${alternativas[2]}</div>`;
    row2.innerHTML += `<div onclick="selecionar(id)" id=${alternativas[3]} class="btn-alternativa">${alternativas[3]}</div>`;
}

function selecionar(opcao) {
    if (jogoRodando) {
        var opcaoErrada = document.getElementById(opcao);
        var opcaoCerta = document.getElementById(palavraSorteada["traducao"]);
        opcaoErrada.style.backgroundColor = "#ff002b";
        opcaoCerta.style.backgroundColor = "#38b000";
        jogoRodando = false;
    }
}

function limpar() {
    palavraSorteada = {};
    alternativas = [];
}

function proxima() {
    limpar();
    jogar();
    jogoRodando = true;
}

function jogar() {
    sortearPalavra();
    gerarAlternativas();
    embaralharAlternativas();
    gerarBotoes();
}

carregarDados();