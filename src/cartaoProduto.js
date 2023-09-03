import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from './menuCarrinho';

export function renderizarCatalogo(){
    for(const produtoCatalogo of catalogo){

        const cartaoProduto = `
        <div id="card-produto-${produtoCatalogo.id}" class="flex flex-col w-80 m-2 p-2 justify-between shadow-xl shadow-slate-400 rounded-lg group ${produtoCatalogo.adolescente ? 'adolescente' : 'adulto'}">
            <img 
            src="./img/${produtoCatalogo.imagem}"
            alt="${produtoCatalogo.nome}"
            class="group-hover:scale-110 duration-300 my-3 w-[290px] self-center " 
            >
            <h2 class="text-sm">${produtoCatalogo.nome}</h2>
            <p class="text-lg">R&#x24; ${produtoCatalogo.preco}</p>
            <button id="adicionar-${produtoCatalogo.id}" class="bg-slate-950 text-slate-200 hover:bg-slate-800 duration-200 rounded-lg active:bg-slate-600"><i class="fa-solid fa-cart-plus"></i></button>
        </div>`;
        document.getElementById("container-produto").innerHTML += cartaoProduto;
    };

    for(const produtoCatalogo of catalogo){
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id));
    }
}
