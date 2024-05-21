document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rollButtonParteCorpo').addEventListener('click', function() {
        const parteCorpo = escolherAleatoriamente("Cabeça", "Peito","Mão esquerda", "Mão direita","Olho esquerdo", "Olho direito","Pé esquerdo", "Pé Direito");

        document.getElementById('resultadoParteCorpo').textContent = `Você rolou o dado de parte do corpo e obteve a ${parteCorpo}!`;
    });
});

function escolherAleatoriamente(...opcoes) {
    const indiceAleatorio = Math.floor(Math.random() * opcoes.length);
    return opcoes[indiceAleatorio];
}
