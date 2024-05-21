document.addEventListener('DOMContentLoaded', function () {
    const PartedocorpoBtnD8 = document.getElementById('PartedocorpoBtnD8');
    const atacarBtnD12 = document.getElementById('atacarBtnD12');
    const reiniciarJogoBtn = document.getElementById('reiniciarJogoBtn');
    const selectArma = document.getElementById('armas');
    const selectMonstro = document.getElementById('monstro');
    const hpMonstroElemento = document.getElementById('hpMonstro');

    function verificarSelecoes() {
        if (selectArma.value && selectMonstro.value) {
            PartedocorpoBtnD8.disabled = false;
            atacarBtnD12.disabled = false;
        } else {
            PartedocorpoBtnD8.disabled = true;
            atacarBtnD12.disabled = true;
        }
    }

    selectArma.addEventListener('change', verificarSelecoes);
    selectMonstro.addEventListener('change', verificarSelecoes);

    PartedocorpoBtnD8.addEventListener('click', function () {
        const parteCorpo = escolherAleatoriamente("Cabeça", "Peito", "Mão esquerda", "Mão direita", "Olho esquerdo", "Olho direito", "Pé esquerdo", "Pé Direito");
        const resultadopartedocorpoElemento = document.getElementById('resultadoMovimento');
        resultadopartedocorpoElemento.innerText = `A parte do corpo atacada é: ${parteCorpo}`;

        // Mostrar imagem correspondente à parte do corpo
        const parteCorpoImg = document.getElementById('parteCorpoImg');
        parteCorpoImg.src = `imagens/partes dos monstros/${parteCorpo.toLowerCase().replace(/\s/g, '-')}.png`; // Ajuste o caminho conforme necessário
    });

    atacarBtnD12.addEventListener('click', function () {
        if (selectArma.value && selectMonstro.value) {
            const resultado = calcularAtaque();
            const resultadoAtaqueElemento = document.getElementById('resultadoAtaque');
            resultadoAtaqueElemento.innerText = `Dano causado: ${resultado}`;

            const hpMonstroAtual = Number(hpMonstroElemento.innerText.split(' ')[3]);
            if (!isNaN(hpMonstroAtual)) {
                const novoHP = Math.max(hpMonstroAtual - resultado, 0); // Evitar HP negativo
                hpMonstroElemento.innerText = `HP do Monstro: ${novoHP}`;

                if (novoHP <= 0) {
                    alert('Você derrotou o monstro! Parabéns!');
                    reiniciarJogoBtn.classList.remove('hidden'); // Mostrar botão de reiniciar
                } else {
                    // Verificar chance de crítico e mostrar GIF
                    const chanceCritico = calcularChanceCritico(selectArma.value);
                    if (chanceCritico) {
                        resultadoAtaqueElemento.innerText = `\n voce acertou um critico: ${resultado}`;
                    }
                    mostrarGifAtaque();
                }
            }
        } else {
            alert('Você precisa escolher a arma e o monstro antes de atacar!');
        }
    });

    reiniciarJogoBtn.addEventListener('click', function () {
        reiniciarJogo();
    });

    selectArma.addEventListener('change', () => {
        const selectedArma = selectArma.value;

        switch (selectedArma) {
            case 'espada':
                document.getElementById('imagemArma').src = 'imagens/armas/espada.png';
                document.getElementById('nomeArma').innerText = 'Espada';
                break;
            case 'arco':
                document.getElementById('imagemArma').src = 'imagens/armas/arco.png';
                document.getElementById('nomeArma').innerText = 'Arco';
                break;
            case 'machado':
                document.getElementById('imagemArma').src = 'imagens/armas/machado.png';
                document.getElementById('nomeArma').innerText = 'Machado';
                break;
            default:
                document.getElementById('imagemArma').src = '';
                document.getElementById('nomeArma').innerText = '';
        }

        verificarSelecoes();
    });

    selectMonstro.addEventListener('change', () => {
        const selectedMonstro = selectMonstro.value;

        switch (selectedMonstro) {
            case 'Leptospirose':
                document.getElementById('imagemmonstro').src = 'imagens/monstros/Leptospirose.jpg';
                document.getElementById('nomemonstro').innerText = 'Leptospirose';
                hpMonstroElemento.innerText = 'HP do Monstro: 1000'; // Definir o HP inicial do monstro
                break;
            case 'Petista':
                document.getElementById('imagemmonstro').src = 'imagens/monstros/petista.png';
                document.getElementById('nomemonstro').innerText = 'Petista';
                hpMonstroElemento.innerText = 'HP do Monstro: 1200'; // Definir o HP inicial do monstro
                break;
            case 'Sogrinha':
                document.getElementById('imagemmonstro').src = 'imagens/monstros/sogrinha.png';
                document.getElementById('nomemonstro').innerText = 'Sogrinha';
                hpMonstroElemento.innerText = 'HP do Monstro: 1500'; // Definir o HP inicial do monstro
                break;
            default:
                document.getElementById('imagemmonstro').src = '';
                document.getElementById('nomemonstro').innerText = '';
                hpMonstroElemento.innerText = '';
        }

        verificarSelecoes();
    });

    function calcularAtaque() {
        const d100 = Math.floor(Math.random() * 100) + 1;
        return d100;
    }

    function calcularChanceCritico(arma) {
        // Supondo uma chance de crítico de 20% para todas as armas
        return Math.random() < 0.2;
    }

    function reiniciarJogo() {
        atacarBtnD12.disabled = true;
        reiniciarJogoBtn.classList.add('hidden'); // Esconder botão de reiniciar
        limparResultados();
        PartedocorpoBtnD8.disabled = false;
        selectArma.value = '';
        selectMonstro.value = '';
        hpMonstroElemento.innerText = '';
    }

    function limparResultados() {
        document.getElementById('resultadoMovimento').innerText = '';
        document.getElementById('resultadoEsquiva').innerText = '';
        document.getElementById('resultadoDefesa').innerText = '';
        document.getElementById('resultadoReiniciar').innerText = '';
        document.getElementById('resultadoAtaque').innerText = '';
        document.getElementById('imagemParteCorpo').innerHTML = ''; // Limpar a imagem da parte do corpo
    }

    function escolherAleatoriamente(...itens) {
        return itens[Math.floor(Math.random() * itens.length)];
    }

    function mostrarGifAtaque() {
        const gifCriticoContainer = document.getElementById('gifCriticoContainer');
        const gifCritico = document.getElementById('gifCritico');
        gifCritico.src = 'imagens/gifdado.gif';
        gifCriticoContainer.classList.remove('hidden');

        // Ocultar o GIF após um tempo (por exemplo, 3 segundos)
        setTimeout(() => {
            gifCriticoContainer.classList.add('hidden');
            gifCritico.src = '';
        }, 3000);
    }
});
