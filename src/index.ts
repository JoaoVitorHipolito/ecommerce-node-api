import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { CategoriaPrismaRepository } from "@modules/catalogo/infra/database/categoria.prisma.repository";
import { ProdutoPrismarepository } from "@modules/catalogo/infra/database/produto.prisma.repository";
import { DomainException } from "@shared/domain/domain.exception";
import { prisma } from "@main/infra/database/orm/prisma/client";
import { categoriaRepositorio as categoriaRepo} from "@shared/infra/database";
import { produtoRepositorio as produtoRepo} from "@shared/infra/database";
async function main(){

    prisma.$connect().then(
        async () => {
            console.log('Postgres Conectado')
        }
    );

   ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////
    
     //const categoriaRecuperada: Categoria | null = await categoriaRepo.recuperarPorUuid("bd7c8b91-1e42-4eda-850c-cded51da61cd");

     //console.log(categoriaRecuperada);

    /////////////////////////////////
    //Recuperar Todas as Categorias//
    /////////////////////////////////
    
   //const todasCategorias: Array<Categoria> = await categoriaRepo.recuperarTodos();

   // console.log(todasCategorias);

    ////////////////////////////////
    //Verifica se Existe Categoria//
    ////////////////////////////////
    
    // const existeCategoria: boolean = await categoriaRepo.existe("3fe02049-0f07-44ae-87d6-99ec0897cb09");

    // console.log(existeCategoria);

    /////////////////////
    //Inserir Categoria//
    /////////////////////
    
    //const categoria: Categoria = Categoria.criar({
    //    nome:'Cozinha'
    //});     

    //const categoriaInserida = await categoriaRepo.inserir(categoria);

    //console.log(categoriaInserida);

    ///////////////////////
    //Atualizar Categoria//
    ///////////////////////
    
//     const categoria: Categoria = Categoria.recuperar({
//         id: "88d7cef0-f390-45c0-8611-1154ec62e089",
//         nome: "Cozinha Americana"
//     });     

//    const atualizouCategoria: boolean = await categoriaRepo.atualizar(categoria.id,categoria);

//     console.log(atualizouCategoria)

    /////////////////////
    //Deletar Categoria//
    /////////////////////
    
    // const categoriaDeletada: boolean = await categoriaRepo.deletar("56858045-092c-43f4-abdf-6884def70aae");
    
    // console.log(categoriaDeletada);

    ////////////////////////////////
	//Recuperar Produto por UUID//
	////////////////////////////////
		
	const produtoRecuperado: Produto | null = await produtoRepo.recuperarPorUuid("c57c4a68-1766-4098-939f-f5b8c0d8eb28");

	//console.log(produtoRecuperado);

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