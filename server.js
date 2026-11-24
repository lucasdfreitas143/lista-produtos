const express = require('express');

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(express.static('public'));
// tudo que estiver na pasta public pode  ser acessada pelo navegador.

const produtos = [
    {id: 1, nome: 'Caderno', preco: 15.9 },
    {id: 2, nome: 'Caneta Azul', preco: 2.5 },
    {id: 3, nome: 'Mochila', preco: 120 }
];

app.get('/api/produtos', (req, res) =>{
    res.json(produtos);
});

app.get('/api/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find((p) => p.id === id);

    res.json(produto);
});

app.post('/api/produtos', (req,res) =>{
    const { nome, preco } = req.body;

    if(!nome || !preco){
        return res.status(400).json({erro: 'Informe nome e preço'});
    }

    const novo = { id: produtos.length + 1, nome: nome, preco: Number(preco)};
    produtos.push(novo);
    res.status(201).json(novo);
})


app.listen(PORTA, () =>{
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});