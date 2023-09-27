import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { CategoriaPrismaRepository } from "@modules/catalogo/infra/database/categoria.prisma.repository";
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

   // const categoriaRecuperada = await categoriaRepo.recuperarPorUuid("b35e732b-e87a-4731-8ae8-82ae15a92a4b")

    //console.log(categoriaRecuperada)

   // const categoria: Categoria = Categoria.criar({
      //  nome: 'mesa'
   // })
  //  const categoriaInserida = await categoriaRepo.inserir(categoria);

    //console.log(categoriaInserida)

   // const categoria = await categoriaRepo.recuperarTodos();
   // console.log(categoria)

 const categoriaDeletada = await categoriaRepo.deletar("b35e732b-e87a-4731-8ae8-82ae15a92a4b")
 console.log(categoriaDeletada)
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