import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { CategoriaPrismaRepository } from "@modules/catalogo/infra/database/categoria.prisma.repository";
import { ProdutoPrismarepository } from "@modules/catalogo/infra/database/produto.prisma.repository";
import { DomainException } from "@shared/domain/domain.exception";
import { prisma } from "@main/infra/database/orm/prisma/client";
import { categoriaRepositorio as categoriaRepo} from "@shared/infra/database";
import { produtoRepositorio as produtoRepo} from "@shared/infra/database";
import { atualizarCategoriaUseCase, deletarCategoriaUseCase, inserirCategoriaUseCase, recuperarCategoriaPorIdUseCase, recuperarProdutoPorIdUseCase, recuperarTodasCategoriasUseCase } from "@modules/catalogo/application/use-case";
import { RecuperarTodasCategoriasUseCase } from "@modules/catalogo/application/use-case/recuperar-todas-categorias/recuperar-todas-categorias.use-case";
import { RecuperarProdutoPorIdUseCase } from "@modules/catalogo/application/use-case/recuperar-produto-por-id/recuperar-produto-por-id.use-case";
async function main(){

    prisma.$connect().then(
        async () => {
            console.log('Postgres Conectado')
        }
    );

   ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////
    
   // console.log(await recuperarCategoriaPorIdUseCase.execute("3fe02049-0f07-44ae-87d6-99ec0897cb09"));

    /////////////////////////////////
    //Recuperar Todas as Categorias//
    /////////////////////////////////

  //  console.log(await recuperarTodasCategoriasUseCase.execute());

    ////////////////////////////////
    //Verifica se Existe Categoria//
    ////////////////////////////////
    
    // const existeCategoria: boolean = await categoriaRepo.existe("3fe02049-0f07-44ae-87d6-99ec0897cb09");

    // console.log(existeCategoria);

    /////////////////////
    //Inserir Categoria//
    /////////////////////
    
    //console.log(await inserirCategoriaUseCase.execute({nome:'Cozinha Brasileira'}));  

   
    ///////////////////////
    //Atualizar Categoria//
    ///////////////////////
    
        // console.log(await atualizarCategoriaUseCase.execute({
        //     id:"b29de66d-00c1-4643-b2aa-b844f9c883c5",
        //     nome:"CAMISA"
        // }))

    /////////////////////
    //Deletar Categoria//
    /////////////////////
    
    //console.log(await deletarCAtegoriaUseCase.execute("dac20a91-7e7c-42ae-a51d-1e8c5f471bff"));

    ////////////////////////////////
	//Recuperar Produto por UUID//
	////////////////////////////////
		
	console.log(await recuperarProdutoPorIdUseCase.execute("bcfdf557-0b9c-4b70-a56d-199088605682"));

    //console.log(produtoRecuperado?.estaDeletado());

    ///////////////////
	//Inserir Produto//
	///////////////////
	
    
    // const categoria01: Categoria = Categoria.recuperar({
    //     id: "88d7cef0-f390-45c0-8611-1154ec62e089",
    //     nome: "Cozinha Americana"
    // });     

    // const categoria02: Categoria = Categoria.recuperar({
    //     id: "3fe02049-0f07-44ae-87d6-99ec0897cb09",
    //     nome: 'Banho'
    // })

    // const produto: Produto = Produto.criar({
    //     nome:'Pano de mesa',
    //     descricao:'Algodão fio 60',
    //     valor:30,
    //     categorias:[categoria01]
    // });

	// const produtoInserido = await produtoRepo.inserir(produto);

	// console.log(produtoInserido);
    

    

    /////////////////////////////////////////////////
	//Recuperar Todos os Produtos e Suas Categorias//
	/////////////////////////////////////////////////
		
	//const todosProdutos: Array<Produto> = await produtoRepo.recuperarTodos();

	//console.log(todosProdutos);

    ///////////////////////////////////////////////
	//Atualizar Produto - Sem Atulizar Categorias//
	///////////////////////////////////////////////

    /*
    const produto = {
        id: "7d6a14d5-02f3-4b6d-8cb8-8601ff151f10",
        nome: "Toalha de Cozinha",
        descricao: "toalha de algodão",
        valor: 200
    }; 

    const atualizouProduto: boolean = await produtoRepo.atualizar(produto.id,produto);
    
    */
    ///////////////////
	//Deletar Produto//
	///////////////////
		
	//const produtoDeletado: boolean = await produtoRepo.deletar("7d6a14d5-02f3-4b6d-8cb8-8601ff151f10");

	//console.log(produtoDeletado);

    
    ////////////////////////////////////////////
	//Adicionar e Remover Categoria ao Produto//
	////////////////////////////////////////////
    
    //const produtoRecuperado: Produto | null = await produtoRepo.recuperarPorUuid("737f111b-eba1-457f-9552-5b5f28511d5d");

    //const categoriaRecuperada: Categoria | null = await categoriaRepo.recuperarPorUuid("03f890b0-684a-44ba-a887-170e26bb2cd2");

    //if (produtoRecuperado && categoriaRecuperada){

        //if (produtoRecuperado.adicionarCategoria(categoriaRecuperada)) {
        //    await produtoRepo.adicionarCategoria(produtoRecuperado,categoriaRecuperada);
        //}

       //if (produtoRecuperado.removerCategoria(categoriaRecuperada)) {
        //    await produtoRepo.removerCategoria(produtoRecuperado,categoriaRecuperada);
        //}

    //}
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
       if (error instanceof DomainException) {
           console.log('Execeção de Dóminio');
           console.log(error.message);
       }
       else {
           console.log('Outras Exceções');
           console.log(error.message);
       }
       await prisma.$disconnect()
       process.exit(1)
   })