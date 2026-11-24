const lista = document.getElementById('lista');
const formulario = document.getElementById('formulario');
const total = document.getElementById('total');

async function carregarProdutos() {
    lista.innerHTML = '<li>Carregando...</li>';
    try {
        const resposta = await fetch('api/produtos');
        const produtos = await resposta.json();

        let html = '';
        for (const produto of produtos) {
            html += ` <tr>
            <td> ${produto.nome}</td>;
            <td> R$ ${produto.preco.toFixed(2)}</td>;
            </tr>`
        }
        lista.innerHTML = html;
        
        total.innerHTML = `Quantidade de produtos <strong> ${produtos.length}</strong>`;
    } catch (erro) {
        lista.innerHTML = '<li>Erro ao carregar os produtos.</li>';
        total.innerHTML = '';
    }
}

formulario.addEventListener('submit', async(evento) =>{
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;

    try{

    
    const resposta = await fetch('/api/produtos', {
        method: 'POST',
        headers: {'Content-Type':'application/json' },
        body: JSON.stringify({nome, preco})
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        mensagem.innerHTML = dados.erro;
    }
formulario.reset();
carregarProdutos();
    } catch (erro) {
        mensagem.innerHTML = "Não foi possivel falar com o servidor";
    }
});
    
carregarProdutos();