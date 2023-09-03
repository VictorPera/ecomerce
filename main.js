import { renderizarCatalogo } from "./src/cartaoProduto";
import { inicializarFiltros } from "./src/filtrosCatalogo";
import { 
    atualizarPrecoCarrinho, 
    inicializarCarrinho, 
    renderizarprodutosCarrinho 
} from "./src/menuCarrinho";

renderizarCatalogo();
inicializarCarrinho();
renderizarprodutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();