import { beforeAll, describe, expect, test } from "vitest";
import { IDEntityUUIDInvalid } from "@shared/domain/domain.exception";
import { Categoria } from "./categoria.entity";
import { NomeCategoriaTamanhoMaximoInvalido, NomeCategoriaTamanhoMinimoInvalido } from "./categoria.exception";
import { RecuperarcategoriaProps, criarcategoriaProps } from "./categoria.types";
import { faker } from '@faker-js/faker';

let nomecategoriaValida: string;
let nomeCategoriaTamanhoMinInvalido: string;
let nomeCategoriaTamanhoMaxInvalido: string;
let UUIDValido: string;
let UUIDInvalido: string;

beforeAll(async()=>{
    nomecategoriaValida = faker.string.alpha({length:{min:3, max:50}})
    nomeCategoriaTamanhoMinInvalido = faker.string.alpha({length:{min:0,max:2}});
    nomeCategoriaTamanhoMaxInvalido = faker.string.alpha({length:{min:51,max:51}});
    UUIDValido = faker.string.uuid(); 
	UUIDInvalido = faker.string.alpha({length:{min:1,max:20}});
    
});

describe('Entidade de Dominio: Categoria', ()=> {

    describe('categoria (Criar)', () =>{

        test(' Deve criar uma categoria valida', async () =>{
            const categoriaValida: criarcategoriaProps ={
                nome: nomecategoriaValida
    
            };
           
            expect(Categoria.criar(categoriaValida))
            .to.be.instanceof(Categoria)
    
            
            
        })
    
        test('Não Deve criarcategoria invalida - Tamanho minimo', async() =>{
            const categoriaInvalida:criarcategoriaProps ={
                nome:nomeCategoriaTamanhoMinInvalido
            }
    
            expect(() => Categoria.criar(categoriaInvalida))
            .toThrowError(NomeCategoriaTamanhoMinimoInvalido)
    
        })
    
        test('Não Deve criarcategoria invalida - Tamanho maximo', async() =>{
            const categoriaInvalida:criarcategoriaProps ={
                nome:nomeCategoriaTamanhoMaxInvalido
            }
    
            expect(() => Categoria.criar(categoriaInvalida))
            .toThrowError(NomeCategoriaTamanhoMaximoInvalido)
    
        })
    
    
    });

    describe('Categoria (Recuperar)', () => {

        test('Deve Recuperar Uma Categoria Válida', async () => {
    
            //Dado (Given)
            const categoriaValida: RecuperarcategoriaProps = {
                id: UUIDValido,
                nome: nomecategoriaValida
            };
    
            //Quando (When) e Então (Then)
            expect(Categoria.recuperar(categoriaValida))
                .to.be.instanceof(Categoria);
    
        });
    
        test('Não Deve Recuperar Categoria Com ID Inválido (UUID Inválido)', async () => {
    
            //Dado (Given)
            //Nome menor que três caracteres
            const categoriaIdInvalido: RecuperarcategoriaProps = {
                id: UUIDInvalido,
                nome: nomecategoriaValida
            };
    
            //Quando (When) e Então (Then)
            expect(() => Categoria.recuperar(categoriaIdInvalido))
                .toThrowError(IDEntityUUIDInvalid);
    
        });
    
        test('Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Mínimo)', async () => {
    
            //Dado (Given)
            //Nome menor que três caracteres
            const categoriaNomeInvalido: RecuperarcategoriaProps = {
                id: UUIDValido,
                nome: nomeCategoriaTamanhoMinInvalido
            };
    
            //Quando (When) e Então (Then)
            expect(() => Categoria.recuperar(categoriaNomeInvalido))
                .toThrowError(NomeCategoriaTamanhoMinimoInvalido);
    
        });
    
        test('Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Máximo)', async () => {
    
            //Dado (Given)
            //Nome maior que 50 caracteres
            const categoriaNomeInvalido: RecuperarcategoriaProps = {
                id: UUIDValido,
                nome: nomeCategoriaTamanhoMaxInvalido
            };
    
            //Quando (When) e Então (Then)
            expect(() => Categoria.recuperar(categoriaNomeInvalido))
                .toThrowError(NomeCategoriaTamanhoMaximoInvalido);
    
        });
    
    });

});

