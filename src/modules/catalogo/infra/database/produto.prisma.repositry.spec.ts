import { faker } from "@faker-js/faker";
import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { PrismaClient, StatusProdutoPrisma } from "@prisma/client";
import { afterEach } from "node:test";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";
import { ProdutoPrismarepository } from "./produto.prisma.repository";
import { StatusProduto } from "@modules/catalogo/domain/produto/produto.types";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";



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
let status: StatusProdutoPrisma

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
                dataCriacao: faker.date.anytime(),
                dataAtualizacao: faker.date.anytime(),
                dataExclusao:faker.date.anytime(),
                status: StatusProduto.ATIVO,
                categorias: [
                  {
                    produtoId: 'e5eeda5d-cf95-4ac4-a7fe-128897d31f12',
                    categoriaId: '159eaca9-f7be-4668-8344-17ecc8263f3e',
                    dataCriacao: faker.date.anytime(),
                    dataAtualizacao: faker.date.anytime(),
                    categoria: {
                        id: '159eaca7-f7be-4668-8344-17ecc8263f3e',
                        nome: 'Mesa',
                        dataCriacao: faker.date.anytime(),
                        dataAtualizacao: faker.date.anytime()
                    }
                },
                    {
                        produtoId: 'e5eeda5d-cf95-4ac4-a7fe-128897d31f12',
                        categoriaId: '21c6d449-2902-4d39-9d76-365180e6def9',
                        dataCriacao: faker.date.anytime(),
                        dataAtualizacao: faker.date.anytime(),
                        categoria: {
                            id: '189eaca9-f7be-4668-8344-17ecc8263f3e',
                            nome: 'nomeCategoria',
                            dataCriacao: faker.date.anytime(),
                            dataAtualizacao: faker.date.anytime(),
                        }
                  }
                ]
              };

            prismaMock.produto.findUnique.mockResolvedValue(produtoPrisma);

            const produto: Produto = ProdutoMap.fromPrismaModelToDomain(produtoPrisma);
            const produtoRecuperada = await produtoRepositorio.recuperarPorUuid(produto.id);
           
            expect(produtoRecuperada).toEqual(produto);
            expect(prismaMock.produto.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.produto.findUnique).toBeCalledWith({
                where: {
                    id: produto.id
                } ,
                include:produtoIncludeCategoriaPrisma

            }); 
        });
    });


})