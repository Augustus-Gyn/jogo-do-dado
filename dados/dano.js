document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rollButtonDano').addEventListener('click', function() {
        const dano = rolardado(25); // numero de dados

        document.getElementById('resultadoDano').textContent = `Você rolou o dado de dano e obteve o número ${dano}!`;

        if (dano === 0) { // alerta para dano nullo
            alert("Seu dano foi nullo.");
        }
    });
});

function rolardado(sides) {
    return Math.floor(Math.random() * (sides + 1)); 
}
