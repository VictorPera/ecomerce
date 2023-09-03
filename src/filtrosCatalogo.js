const catalogoProdutos = document.getElementById("container-produto");

function exibirTodos(){
    const produtosEscondidos = Array.from(catalogoProdutos.getElementsByClassName('hidden'));

    for(const produto of produtosEscondidos){
        produto.classList.remove('hidden');
    }
}

function esconderAdultos(){
    exibirTodos();
    const produtosAdultos = Array.from(catalogoProdutos.getElementsByClassName('adulto'));

    for(const produto of produtosAdultos){
        produto.classList.add('hidden');
    }
}

function esconderAdolescentes(){
    exibirTodos();
    const produtosAdolescentes = Array.from(catalogoProdutos.getElementsByClassName('adolescente'));

    for(const produto of produtosAdolescentes){
        produto.classList.add('hidden');
    }
}

export function inicializarFiltros(){
    document.getElementById('exibir-todos').addEventListener('click', exibirTodos);
    document.getElementById('exibir-adolescentes').addEventListener('click', esconderAdultos);
    document.getElementById('exibir-adultos').addEventListener('click', esconderAdolescentes);
}