import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { CategoriaPrismaRepository } from "@modules/catalogo/infra/database/categoria.prisma.repository";
import { ProdutoPrismarepository } from "@modules/catalogo/infra/database/produto.prisma.Repository";
import { PrismaClient } from "@prisma/client";
import { DomainException } from "@shared/domain/domain.exception";

const prisma = new PrismaClient({
    log: ['query', 'info'],
    errorFormat: 'pretty'
});

async function main(){

    prisma.$connect().then(
        async () => {
            console.log('Postgres Conectado')
        }
    );

    const categoriaRepo = new CategoriaPrismaRepository(prisma);
    const produtoRepo = new ProdutoPrismarepository(prisma);

   ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////
    
     //const categoriaRecuperada: Categoria | null = await categoriaRepo.recuperarPorUuid("bd7c8b91-1e42-4eda-850c-cded51da61cd");

     //console.log(categoriaRecuperada);

    /////////////////////////////////
    //Recuperar Todas as Categorias//
    /////////////////////////////////
    
   // const todasCategorias: Array<Categoria> = await categoriaRepo.recuperarTodos();

    //console.log(todasCategorias);

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
		
	//const produtoRecuperado: Produto | null = await produtoRepo.recuperarPorUuid("7f35c7f4-ce26-4503-bfce-0afd937adfb8");

	//console.log(produtoRecuperado);

    //console.log(produtoRecuperado?.estaDeletado());

    ///////////////////
	//Inserir Produto//
	///////////////////
	
    
    const categoria01: Categoria = Categoria.recuperar({
        id: "88d7cef0-f390-45c0-8611-1154ec62e089",
        nome: "Cozinha Americana"
    });     

    const categoria02: Categoria = Categoria.recuperar({
        id: "3fe02049-0f07-44ae-87d6-99ec0897cb09",
        nome: 'Banho'
    })

    const produto: Produto = Produto.criar({
        nome:'Pano de mesa',
        descricao:'Algodão fio 60',
        valor:30,
        categorias:[categoria01]
    });

	const produtoInserido = await produtoRepo.inserir(produto);

	console.log(produtoInserido);
    

    

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