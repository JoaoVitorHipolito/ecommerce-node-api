import { beforeAll, describe, expect, test } from "vitest";
import { Categoria } from "../categoria/categoria.entity";
import { criarProdutoProps } from "./produto.types";
import { Produto } from "./produto.entity";
import { DescricaoProdutoTamanhoMaximoInvalido, DescricaoProdutoTamanhoMinimoInvalido, NomeProdutoTamanhoMaximoInvalido, NomeProdutoTamanhoMinimoInvalido, QtdMaximaCategoriasProdutoInvalida, QtdMinimaCategoriasProdutoInvalida, ValorMinimoProdutoInvalido } from "./produto.exception";
import { Faker, faker } from "@faker-js/faker";

let nomeProdutoValido: string;
let nomeProdutoTamanhoMinInvalido: string;
let nomeProdutoTamanhoMaxInvalido: string;
let descricaoProdutoValido: string;
let descricaoProdutoTamanhoMinInvalido: string;
let descricaoProdutoTamanhoMaxInvalido: string;
let valorProdutoValido: number;
let valorMinProdutoInvalido: number;
let categoriasValidas: Array<Categoria>;
let categoriasQtdMinInvalidas: Array<Categoria>;
let categoriasQtdMaxInvalidas: Array<Categoria>;

beforeAll(async () => {
   
	nomeProdutoValido = faker.string.alpha({length:{min:5,max:50}});
	nomeProdutoTamanhoMinInvalido = faker.string.alpha({length:{min:0,max:4}});
	nomeProdutoTamanhoMaxInvalido = faker.string.alpha({length:{min:51,max:51}});

	descricaoProdutoValido = faker.string.alpha({length:{min:10,max:200}});
	descricaoProdutoTamanhoMinInvalido = faker.string.alpha({length:{min:0,max:9}});
	descricaoProdutoTamanhoMaxInvalido = faker.string.alpha({length:{min:201,max:201}});

	valorProdutoValido = faker.number.int({min:1,max:2000 });
	valorMinProdutoInvalido = faker.number.int({min:-10,max: -1});

    const categoriaValida01 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
    const categoriaValida02 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
    const categoriaValida03 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
    const categoriaValida04 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
    categoriasValidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], {min:1,max:3});
    categoriasQtdMinInvalidas = [];
    categoriasQtdMaxInvalidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03,categoriaValida04], { min: 4, max: 4});

});


describe('Entidade de Domínio: Criar Produto', () => {
    
    //Teste define um conjunto de expectativas relacionadas. 
    test('Deve Criar Um Produto Válido', async () => {

        //Dado (Given)
        const produtoValido: criarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(Produto.criar(produtoValido))
            .to.be.instanceof(Produto);

    });

    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Mínimo)', async () => {

        //Dado (Given)
        //Nome menor que cinco caracteres
        const produtoNomeInvalido: criarProdutoProps = {
            nome: nomeProdutoTamanhoMinInvalido,
            descricao: descricaoProdutoValido,
            valor:valorProdutoValido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMinimoInvalido);

    });

    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Máximo)', async () => {

        //Dado (Given)
        //Nome maior que cinquenta caracteres
        const produtoNomeInvalido: criarProdutoProps = {
            nome: nomeProdutoTamanhoMaxInvalido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMaximoInvalido);

    });
    
    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Descrição Inválida (Tamanho Mínimo)', async () => {

        //Dado (Given)
        //Descrição menor que dez caracteres
        const produtoNomeInvalido: criarProdutoProps = {
            nome: nomeProdutoValido,
            descricao:descricaoProdutoTamanhoMinInvalido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(DescricaoProdutoTamanhoMinimoInvalido);

    });
    
    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Descrição Inválida (Tamanho Máximo)', async () => {


        //Dado (Given)
        //Descrição maior que duzentos caracteres
        const produtoNomeInvalido: criarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoTamanhoMaxInvalido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(DescricaoProdutoTamanhoMaximoInvalido);

    });

    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Valor Mínimo Inválido', async () => {


        //Dado (Given)
        //Valor mínimo menor que 0
        const produtoNomeInvalido: criarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorMinProdutoInvalido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ValorMinimoProdutoInvalido);

    });

    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Número Mínimo de Categorias Inválido', async () => {

       
        //Dado (Given)
        //Nenhuma categoria é atribuida - menor que 1
        const produtoNomeInvalido: criarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdMinInvalidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(QtdMinimaCategoriasProdutoInvalida);

    });

    //Teste define um conjunto de expectativas relacionadas. 
    test('Não Deve Criar Produto Com Número Máximo de Categorias Inválido', async () => {

       
        //Dado (Given)
        //4 categorias é atribuidas - maior que 3
        const produtoNomeInvalido: criarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdMaxInvalidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(QtdMaximaCategoriasProdutoInvalida);

    });
    
});