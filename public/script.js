const lista = document.getElementById('lista');
const formulario = document.getElementById('formulario');

async function carregarProdutos() {
    lista.innerHTML = '<li>Carregando...</li>';
    try {
        const resposta = await fetch('api/produtos');
        const produtos = await resposta.json();

        let html = '';
        for (const produto of produtos) {
            html += `<li> ${produto.nome} - R$ ${produto.preco.toFixed(2)}</li>`;
        }
        lista.innerHTML = html;
    } catch (erro) {
        lista.innerHTML = '<li>Erro ao carregar os produtos.</li>'
    }
}

formulario.addEventListener('submit', async(evento) =>{
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;

    await fetch('/api/produtos', {
        method: 'POST',
        headers: {'Content-Type':'application/json' },
        body: JSON.stringify({nome, preco})
    });
    formulario.reset();
    carregarProdutos();
});
carregarProdutos();