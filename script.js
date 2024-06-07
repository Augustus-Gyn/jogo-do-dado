document.addEventListener('DOMContentLoaded', function () {
    const PartedocorpoBtnD8 = document.getElementById('PartedocorpoBtnD8');
    const atacarBtnD100 = document.getElementById('atacarBtnD100');
    const reiniciarJogoBtn = document.getElementById('reiniciarJogoBtn');
    const selectArma = document.getElementById('armas');
    const selectMonstro = document.getElementById('monstro');
    const hpMonstroElemento = document.getElementById('hpMonstro');

    const partesCorpo = [
        "Cabeça", "Peito", "Mão esquerda", "Mão direita", 
        "Olho esquerdo", "Olho direito", "Pé esquerdo", "Pé Direito"
    ];

    const monstros = {
        'Leptospirose': { src: 'imagens/monstros/Leptospirose.jpg', hp: 350 },
        'Petista': { src: 'imagens/monstros/petista.png', hp: 1000 },
        'Sogrinha': { src: 'imagens/monstros/sogrinha.png', hp: 550 }
    };

    const armas = {
        'espada': { src: 'imagens/armas/espada.png', nome: 'Espada' },
        'arco': { src: 'imagens/armas/arco.png', nome: 'Arco' },
        'machado': { src: 'imagens/armas/machado.png', nome: 'Machado' }
    };

    function verificarSelecoes() {
        const isDisabled = !selectArma.value || !selectMonstro.value;
        PartedocorpoBtnD8.disabled = isDisabled;
        atacarBtnD100.disabled = isDisabled;
    }

    function atualizarImagemETexto(elementoImagem, caminhoImagem, elementoTexto, texto) {
        elementoImagem.src = caminhoImagem;
        elementoTexto.innerText = texto;
    }

    function calcularChanceCritico() {
        return Math.random() < 0.2; // 20% de chance
    }

    function mostrarGifAtaque(callback) {
        const gifAtaqueContainer = document.getElementById('gifAtaqueContainer');
        const gifAtaque = document.getElementById('gifAtaque');
        gifAtaque.src = 'imagens/gifdado.gif';
        gifAtaqueContainer.classList.remove('hidden');
        setTimeout(() => {
            gifAtaqueContainer.classList.add('hidden');
            gifAtaque.src = '';
            callback();
        }, 1000); // Duração do gif antes de mostrar o resultado
    }

    function reiniciarJogo() {
        atacarBtnD100.disabled = true;
        reiniciarJogoBtn.classList.add('hidden');
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
        document.getElementById('imagemParteCorpo').innerHTML = '';
    }

    function escolherAleatoriamente(itens) {
        return itens[Math.floor(Math.random() * itens.length)];
    }

    function rolarDado(lados) {
        return Math.floor(Math.random() * lados) + 1;
    }

    function atualizarHpMonstro(dano) {
        const hpMonstroAtual = Number(hpMonstroElemento.innerText.split(' ')[3]);
        const novoHP = Math.max(hpMonstroAtual - dano, 0);
        hpMonstroElemento.innerText = `HP do Monstro: ${novoHP}`;
        return novoHP;
    }

    PartedocorpoBtnD8.addEventListener('click', function () {
        const parteCorpo = escolherAleatoriamente(partesCorpo);
        document.getElementById('resultadoMovimento').innerText = `A parte do corpo atacada é: ${parteCorpo}`;
        document.getElementById('parteCorpoImg').src = `imagens/partes dos monstros/${parteCorpo.toLowerCase().replace(/\s/g, '-')}.png`;
    });

    atacarBtnD100.addEventListener('click', function () {
        if (selectArma.value && selectMonstro.value) {
            mostrarGifAtaque(() => {
                const resultado = rolarDado(100);
                const isCritico = calcularChanceCritico();
                const danoFinal = isCritico ? resultado * 2 : resultado;
                const resultadoAtaqueElemento = document.getElementById('resultadoAtaque');
                const novoHP = atualizarHpMonstro(danoFinal);

                resultadoAtaqueElemento.innerText = `Resultado do D: ${danoFinal}` + (isCritico ? ` (Crítico: +${resultado})` : '');

                if (novoHP <= 0) {
                    alert('Você derrotou o monstro! Parabéns!');
                    reiniciarJogoBtn.classList.remove('hidden');
                }
            });
        } else {
            alert('Você precisa escolher a arma e o monstro antes de atacar!');
        }
    });

    reiniciarJogoBtn.addEventListener('click', reiniciarJogo);

    selectArma.addEventListener('change', () => {
        const selectedArma = armas[selectArma.value];
        if (selectedArma) {
            atualizarImagemETexto(
                document.getElementById('imagemArma'), selectedArma.src,
                document.getElementById('nomeArma'), selectedArma.nome
            );
        }
        verificarSelecoes();
    });

    selectMonstro.addEventListener('change', () => {
        const selectedMonstro = monstros[selectMonstro.value];
        if (selectedMonstro) {
            atualizarImagemETexto(
                document.getElementById('imagemmonstro'), selectedMonstro.src,
                document.getElementById('nomemonstro'), selectMonstro.value
            );
            hpMonstroElemento.innerText = `HP do Monstro: ${selectedMonstro.hp}`;
        }
        verificarSelecoes();
    });

    // Adicionando event listeners para os botões de rolagem de dados
    const dados = [
        { id: 'atacarBtnD2', lados: 2 },
        { id: 'atacarBtnD4', lados: 4 },
        { id: 'atacarBtnD6', lados: 6 },
        { id: 'atacarBtnD8', lados: 8 },
        { id: 'atacarBtnD10', lados: 10 },
        { id: 'atacarBtnD12', lados: 12 },
        { id: 'atacarBtnD20', lados: 20 },
        { id: 'atacarBtnD30', lados: 30 },
    ];

    dados.forEach(dado => {
        document.getElementById(dado.id).addEventListener('click', () => {
            mostrarGifAtaque(() => {
                const resultado = rolarDado(dado.lados);
                const isCritico = calcularChanceCritico();
                const danoFinal = isCritico ? resultado * 2 : resultado;
                const resultadoElemento = document.getElementById('resultadoAtaque');
                const novoHP = atualizarHpMonstro(danoFinal);

                resultadoElemento.innerText = `Resultado do D${dado.lados}: ${danoFinal}` + (isCritico ? ` (Crítico: +${resultado})` : '');

                if (isCritico) {
                    mostrarGifAtaque();
                }
            });
        });
    });
});
