import { atualizarPrecoCarrinho } from "./src/menuCarrinho";
import { apagarDolocalStorage, desenharProdutoCarrinhoSimples, lerLocalStorage, salvarLocalStorage } from "./src/utilidades";

//Função que desenhas os cards de produtos na section de produtos do checkout, cards esses similares aos do carrinho
function desenharProdutosCheckout(){
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

    for(const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoCarrinhoSimples(idProduto, 'container-produtos-checkout', idsProdutoCarrinhoComQuantidade[idProduto]);
    }
}

//Função que finaliza a compra e gera um histórico de compras
function finalizarCompra(event){
    event.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
        return;
    }

    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }
    const historicoDePedidos = lerLocalStorage('historico') ?? {};
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage('historico', historicoDePedidosAtualizado);
    apagarDolocalStorage('carrinho');

    window.location.href = window.location.origin + '/pedidos.html';
}

desenharProdutosCheckout();
atualizarPrecoCarrinho();

document.addEventListener('submit', (event) => finalizarCompra(event));