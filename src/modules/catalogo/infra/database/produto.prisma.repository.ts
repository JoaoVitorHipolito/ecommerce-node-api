import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { CategoriaMap } from "@modules/catalogo/mappers/categoria.map";
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { defaultInclude } from "vitest/config";

class ProdutoPrismarepositroy extends PrismaRepository implements IProdutoRepository<Produto>{
    async recuperarPorUuid(uuid: string): Promise<Produto | null> {
        const produtoRecuperada = await this._datasource.produto.findUnique({
            where: {
                id: uuid
            },
            include: {
                categorias:{
                    include: {
                        categoria:true
                    }
                }
            }
        });


        if (produtoRecuperada){

            const produto = Produto.recuperar({
                id: produtoRecuperada.id,
                nome: produtoRecuperada.nome,
                descricao:produtoRecuperada.descricao,
                valor: produtoRecuperada.valor,
                categorias: produtoRecuperada.categorias.map(
                    (categoria) => {
                        return Categoria.recuperar({
                            id: categoria.produtoId,
                            nome:categoria.categoria.nome
                        })
                    }
                )
            })



          return produto;
        }
        return null
    }
    recuperarTodos(): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }
   async existe(uuid: string): Promise<boolean> {
        const produtoExistente = await this.recuperarPorUuid(uuid);
		if (produtoExistente)  {return true;}
		return false;
    }
    inserir(produto: Produto): Promise<Produto> {
        const produtoInserido = await this._datasource.produto.create(
            {
                data:{
                    id: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    valor: produto.valor,
                    categorias:{
                        create:[
                           categoria{
                       
                           }
                        ]
                    }
                    
                }
            })
    }
    atualizar(uuid: string, entity: Partial<Produto>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deletar(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}