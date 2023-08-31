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