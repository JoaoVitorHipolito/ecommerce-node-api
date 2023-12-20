import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProduto } from "@modules/catalogo/domain/produto/produto.types";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { ProdutoMap } from "@modules/catalogo/infra/database/mappers/produto.map";
import { IUseCase } from "@shared/application/use-case.interface";

class RecuperarTodosProdutosUseCase implements IUseCase<void,Array<IProduto>>{
    private _produtoRepositorio: IProdutoRepository<Produto>;
 
    constructor(repositorio: IProdutoRepository<Produto>) {
      this._produtoRepositorio = repositorio;
    }
   
    async execute(): Promise<IProduto[]> {
        
       const todosProdutos: Array<Produto> = await this._produtoRepositorio.recuperarTodos()

       const todosProdutosDTO = todosProdutos.map(
        (produto) => ProdutoMap.toDTO(produto)
       )
       return todosProdutosDTO
   }
}

export{RecuperarTodosProdutosUseCase}