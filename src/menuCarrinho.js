function fechaCarrinho(){
    document.getElementById("carrinho").classList.remove('right-0');
    document.getElementById("carrinho").classList.add('right-[-370px]');
}

function abrirCarrinho(){
    document.getElementById("carrinho").classList.remove('right-[-370px]');
    document.getElementById("carrinho").classList.add('right-0');
}

export function inicializarCarrinho(){
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");

    botaoFecharCarrinho.addEventListener('click', fechaCarrinho);
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
}

export function adicionarAoCarrinho(){
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    const cartaoProdutoCarrinho = `
    <article class="flex bg-slate-100 rounded-lg relative">
        <button id="fechar-carrinho"><i class="fa-solid fa-circle-xmark text-slate-500 absolute right-[10px] top-[50px] hover:text-slate-900 duration-300"></i></button>
        <img src="./img/produto-1.jpg" alt="Carrinho: " class="w-24 rounded-lg p-2">
        <div>
            <p class="text-slate-900 text-sm">As Crônicas de Gelo e Fogo (Guerra dos Tronos)</p>
            <p class="text-green-800 text-lg">Preço</p>
        </div>
    </article>`;
    containerProdutosCarrinho.innerHTML += cartaoProdutoCarrinho;
}