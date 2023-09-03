import { catalogo, lerLocalStorage, salvarLocalStorage } from './utilidades';

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function fechaCarrinho() {
	document.getElementById('carrinho').classList.remove('right-0');
	document.getElementById('carrinho').classList.add('right-[-370px]');
}

function abrirCarrinho() {
	document.getElementById('carrinho').classList.remove('right-[-370px]');
	document.getElementById('carrinho').classList.add('right-0');
}

export function inicializarCarrinho() {
	const botaoFecharCarrinho = document.getElementById('fechar-carrinho');
	const botaoAbrirCarrinho = document.getElementById('abrir-carrinho');

	botaoFecharCarrinho.addEventListener('click', fechaCarrinho);
	botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
}

function removerDoCarrinho(idProduto) {
	delete idsProdutoCarrinhoComQuantidade[idProduto];
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
	atualizarPrecoCarrinho();
	renderizarprodutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
	idsProdutoCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
	atualizarPrecoCarrinho();
	atualizarInformacaoQunatidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
	if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
		removerDoCarrinho(idProduto);
		return;
	}
	idsProdutoCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
	atualizarPrecoCarrinho();
	atualizarInformacaoQunatidade(idProduto);
}

function atualizarInformacaoQunatidade(idProduto) {
	document.getElementById(`quantidade-${idProduto}`).innerText =
		idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
	const produto = catalogo.find((p) => p.id === idProduto);
	const containerProdutosCarrinho =
		document.getElementById('produtos-carrinho');

	const elementoArticle = document.createElement('article');

	const articleClasses = ['flex', 'bg-slate-100', 'rounded-lg', 'relative'];

	for (const articleClass of articleClasses) {
		elementoArticle.classList.add(articleClass);
	}

	const cartaoProdutoCarrinho = `
        <button id="remover-item-${produto.id}">
            <i class="fa-solid fa-circle-xmark text-slate-500 absolute right-[10px] top-[40px] hover:text-slate-900 duration-300"></i>
        </button>

        <img src="./img/${produto.imagem}" alt="Carrinho: ${
		produto.nome
	}" class="w-24 h-24 rounded-lg p-2">

        <div class="py-2 flex flex-col justify-between">
            <p class="text-slate-900 text-sm">${produto.nome}</p>
            <p class="text-green-800 text-lg">R$ ${produto.preco}</p>
        </div>

        <div class="flex items-end text-slate-950 absolute bottom-0 right-5 gap-4 text-lg">
            <button id="decrementar-produto-${produto.id}">-</button>
            <p id="quantidade-${produto.id}">${
		idsProdutoCarrinhoComQuantidade[produto.id]
	}</p>
            <button id="incrementar-produto-${produto.id}">+</button>
        </div>`;

	elementoArticle.innerHTML = cartaoProdutoCarrinho;

	containerProdutosCarrinho.appendChild(elementoArticle);

	document
		.getElementById(`decrementar-produto-${produto.id}`)
		.addEventListener('click', () =>
			decrementarQuantidadeProduto(produto.id)
		);

	document
		.getElementById(`incrementar-produto-${produto.id}`)
		.addEventListener('click', () =>
			incrementarQuantidadeProduto(produto.id)
		);

	document
		.getElementById(`remover-item-${produto.id}`)
		.addEventListener('click', () => removerDoCarrinho(produto.id));
}

export function renderizarprodutosCarrinho() {
	const containerProdutosCarrinho =
		document.getElementById('produtos-carrinho');
	containerProdutosCarrinho.innerHTML = '';

	for (const idProduto in idsProdutoCarrinhoComQuantidade) {
		desenharProdutoNoCarrinho(idProduto);
	}
}

export function adicionarAoCarrinho(idProduto) {
	if (idProduto in idsProdutoCarrinhoComQuantidade) {
		incrementarQuantidadeProduto(idProduto);
		return;
	}
	idsProdutoCarrinhoComQuantidade[idProduto] = 1;
	salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
	desenharProdutoNoCarrinho(idProduto);
	atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
	const precoCarrinho = document.getElementById('preco-total');
	let precoTotalCarrinho = 0;

	for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
		precoTotalCarrinho +=
			catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
			idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
	}
	precoCarrinho.innerText = `Total: R$ ${precoTotalCarrinho}`;
}
