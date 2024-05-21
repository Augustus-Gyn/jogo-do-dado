document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rollButtonMovimento').addEventListener('click', function() {
        const movimento = rolardado(100);

        document.getElementById('resultadoMovimento').textContent = `Você rolou o dado de movimento e obteve o número ${movimento}!`;

        if (movimento === 0) {
            alert("Você permanece parado.");
        }
    });
});

function rolardado(sides) {
    return Math.floor(Math.random() * (sides + 1));
}
