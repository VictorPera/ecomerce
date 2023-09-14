const catalogoProdutos = document.getElementById("container-produto");

//Função que exibe todos os produtos no filtro "Todos"
function exibirTodos(){
    const produtosEscondidos = Array.from(catalogoProdutos.getElementsByClassName('hidden'));

    for(const produto of produtosEscondidos){
        produto.classList.remove('hidden');
    }
}

//Função que esconde os livros "Adultos"
function esconderAdultos(){
    exibirTodos();
    const produtosAdultos = Array.from(catalogoProdutos.getElementsByClassName('adulto'));

    for(const produto of produtosAdultos){
        produto.classList.add('hidden');
    }
}

//Função que esconde os livros "Adolescentes"
function esconderAdolescentes(){
    exibirTodos();
    const produtosAdolescentes = Array.from(catalogoProdutos.getElementsByClassName('adolescente'));

    for(const produto of produtosAdolescentes){
        produto.classList.add('hidden');
    }
}

//Função que inicializa os filtros
export function inicializarFiltros(){
    document.getElementById('exibir-todos').addEventListener('click', exibirTodos);
    document.getElementById('exibir-adolescentes').addEventListener('click', esconderAdultos);
    document.getElementById('exibir-adultos').addEventListener('click', esconderAdolescentes);
}