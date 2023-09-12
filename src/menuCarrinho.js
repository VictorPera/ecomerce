import { catalogo, lerLocalStorage, salvarLocalStorage } from './utilidades';

//constante que verifiaca se tem produtos no carrinho
const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

//Função para fechar o carrinho
function fechaCarrinho() {
	document.getElementById('carrinho').classList.remove('right-0');
	document.getElementById('carrinho').classList.add('right-[-370px]');
}

//Função para abrir o carrinho
function abrirCarrinho() {
	document.getElementById('carrinho').classList.remove('right-[-370px]');
	document.getElementById('carrinho').classList.add('right-0');
}

//Função que leva para a página de checkout após apertar o botão de "finalizar compra"
function irParaCheckout(){
	if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
		return;
	}
	window.location.href = window.location.origin + '/checkout.html';
}

//Função que inicializa o carrinho
export function inicializarCarrinho() {
	const botaoFecharCarrinho = document.getElementById('fechar-carrinho');
	const botaoAbrirCarrinho = document.getElementById('abrir-carrinho');
	const botaoIrParaCheckout = document.getElementById('finalizar-compra');

	botaoFecharCarrinho.addEventListener('click', fechaCarrinho);
	botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
	botaoIrParaCheckout.addEventListener('click', irParaCheckout);
}

//Função que remove itens do carrinho
function removerDoCarrinho(idProduto) {
	delete idsProdutoCarrinhoComQuantidade[idProduto];
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
	atualizarPrecoCarrinho();
	renderizarprodutosCarrinho();
}

//Função que adiciona itens pelo carrinho
function incrementarQuantidadeProduto(idProduto) {
	idsProdutoCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
	atualizarPrecoCarrinho();
	atualizarInformacaoQunatidade(idProduto);
}

//Função que remove itens pelo carrinho
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

//Função que atualiza a informação de quantidade de produtos
function atualizarInformacaoQunatidade(idProduto) {
	document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

//Função resposável por criar os produtos do carrinho
function desenharProdutoNoCarrinho(idProduto) {
	const produto = catalogo.find((p) => p.id === idProduto);
	const containerProdutosCarrinho = document.getElementById('produtos-carrinho');

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

	document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id));

	document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));

	document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));
}

//Função responsável por mostrar ou não os produtos do carrinho
export function renderizarprodutosCarrinho() {
	const containerProdutosCarrinho = document.getElementById('produtos-carrinho');
	containerProdutosCarrinho.innerHTML = '';

	for (const idProduto in idsProdutoCarrinhoComQuantidade) {
		desenharProdutoNoCarrinho(idProduto);
	}
}

//Função responsável por adicionar produtos do homepage ao carrinho através de um botão
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

//Função que atualiza os preços do carrinho com base na quantidade dos produtos
export function atualizarPrecoCarrinho() {
	const precoCarrinho = document.getElementById('preco-total');
	let precoTotalCarrinho = 0;

	for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
		precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
	}
	precoCarrinho.innerText = `Total: R$ ${precoTotalCarrinho}`;
}
