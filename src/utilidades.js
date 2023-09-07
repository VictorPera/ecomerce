export const catalogo = [
	{
		id: '1',
		nome: 'Box Senhor dos Anéis + O Hobbit',
		preco: 165,
		imagem: 'produto-1.jpg',
		adolescente: false,
	},
	{
		id: '2',
		nome: 'Box Harry Potter completa',
		preco: 365,
		imagem: 'produto-2.jpg',
		adolescente: false,
	},
	{
		id: '3',
		nome: 'Box Jogos Vorazes completa',
		preco: 99.99,
		imagem: 'produto-3.jpg',
		adolescente: false,
	},
	{
		id: '4',
		nome: 'Box Trono de Vidro completa',
		preco: 199.99,
		imagem: 'produto-4.jpg',
		adolescente: false,
	},
	{
		id: '5',
		nome: 'As Crônicas de Gelo e Fogo',
		preco: 550,
		imagem: 'produto-5.jpg',
		adolescente: false,
	},
	{
		id: '6',
		nome: 'Diário De Um Banana - 10 Volumes',
		preco: 288.5,
		imagem: 'produto-6.jpg',
		adolescente: true,
	},
	{
		id: '7',
		nome: 'Box Arsène Lupin Editora Principis - 7 volumes',
		preco: 84.99,
		imagem: 'produto-7.jpg',
		adolescente: false,
	},
	{
		id: '8',
		nome: 'Box The Witcher',
		preco: 350,
		imagem: 'produto-8.jpg',
		adolescente: false,
	},
];

export function salvarLocalStorage(chave, informacao){
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave){
    return JSON.parse(localStorage.getItem(chave));
}

export function apagarDolocalStorage(chave){
	localStorage.removeItem(chave);
}

export function desenharProdutoCarrinhoSimples(idProduto, idContainerHTML, quantidadeProduto) {
	const produto = catalogo.find((p) => p.id === idProduto);
	const containerProdutosCarrinho = document.getElementById(idContainerHTML);

	const elementoArticle = document.createElement('article');

	const articleClasses = ['flex', 'bg-stone-200', 'rounded-lg', 'relative', 'mb-2', 'w-96'];

	for (const articleClass of articleClasses) {elementoArticle.classList.add(articleClass);}

	const cartaoProdutoCarrinho = `
        <img src="./img/${produto.imagem}" alt="Carrinho: ${produto.nome}" class="w-24 h-24 rounded-lg p-2">

        <div class="py-2 flex flex-col justify-between">
            <p class="text-slate-900 text-sm p-1">${produto.nome}</p>
            <p class="text-green-800 text-lg">R$ ${produto.preco}</p>
        </div>

        <div class="flex items-end text-slate-950 absolute bottom-0 right-2 text-lg">
            <p id="quantidade-${produto.id}">${quantidadeProduto}</p>
        </div>
	`;

	elementoArticle.innerHTML = cartaoProdutoCarrinho;

	containerProdutosCarrinho.appendChild(elementoArticle);
}