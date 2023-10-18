import { faker } from "@faker-js/faker";
import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { PrismaClient, StatusProdutoPrisma } from "@prisma/client";
import { afterEach } from "node:test";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";
import { ProdutoPrismarepository } from "./produto.prisma.repository";



const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

let produtoRepositorio: ProdutoPrismarepository;
let UUIDValido: string;
let nomeProdutoValido: string;
let descricaoProdutoValido: string;
let valorProdutoValido: number;
let categoriasValidas:Array<Categoria>;;
let dataCriacaoproduto: Date;
let dataAtualizacaoproduto: Date;
let dataExclusao: Date;
//let status: StatusProdutoPrisma

describe('Repositorio Prisma: Produto', () => {

    beforeAll(async () => {
        produtoRepositorio = new ProdutoPrismarepository(prismaMock);

         //Preencendo as variáveis com dados em conformidade com as restrições da regra de negócio

         const categoriaValida01 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
         const categoriaValida02 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
         const categoriaValida03 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});

         UUIDValido = faker.string.uuid();
         nomeProdutoValido = faker.string.alpha({length:{min:Produto.TAMANHO_MINIMO_NOME, max:Produto.TAMANHO_MAXIMO_NOME}});
         descricaoProdutoValido = faker.string.alpha({length:{min:Produto.TAMANHO_MINIMO_DESCRICAO,max:Produto.TAMANHO_MAXIMO_DESCRICAO}});
         valorProdutoValido = faker.number.int({min:Produto.VALOR_MINIMO});
         categoriasValidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], {min:1,max:3});
         dataCriacaoproduto = faker.date.anytime();
         dataAtualizacaoproduto = faker.date.anytime();
         dataExclusao = faker.date.anytime();
        
    });

    afterEach(()=>{
        vi.resetAllMocks();
        mockReset(prismaMock);
    });

    describe('Recuperar Produto por ID', () =>{

        test('Deve Recuperar um produto por UUID', async () => {
            const produtoPrisma ={
                id: 'c57c4a68-1766-4098-939f-f5b8c0d8eb28',
                nome: 'Pano de mesa',
                descricao: 'Algodão fio 60',
                valor: 30,
                dataCriacao: 2023-10-10T00:32:58.192Z,
                dataAtualizacao: 2023-10-10T00:32:58.192Z,
                dataExclusao: null,
                status: 'ATIVO',
                categorias: [
                  {
                    produtoId: 'c57c4a68-1766-4098-939f-f5b8c0d8eb28',
                    categoriaId: '88d7cef0-f390-45c0-8611-1154ec62e089',
                    dataCriacao: 2023-10-10T00:32:58.192Z,
                    dataAtualizacao: 2023-10-10T00:32:58.192Z,
                    categoria: {
                        id: UUIDValido,
                        nome: nomeCategoriaValido,
                        dataCriacao: dataCriacaoCategoria,
                        dataAtualizacao: dataAtualizacaoCategoria
                    }
                  }
                ]
              };

            prismaMock.produto.findUnique.mockResolvedValue(produtoPrisma);

            const produto: Produto = ProdutoMap.toDomain(produtoPrisma);
            const produtoRecuperada = await produtoRepositorio.recuperarPorUuid(produto.id);
           
            expect(produtoRecuperada).toEqual(produto);
            expect(prismaMock.produto.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.produto.findUnique).toBeCalledWith({
                where: {
                    id: produto.id
                }    
            }); 
        });
    });

})