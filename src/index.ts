import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { PrismaClient } from "@prisma/client";
import { DomainException } from "@shared/domain/domain.exception";

const prisma = new PrismaClient();

async function main(){


   /* let categoria: Categoria;
	categoria = Categoria.criar({nome:'mesa'});



    await prisma.categoria.create({
        data: {
            id: categoria.id,
            nome: categoria.nome
        }
    }); */

       
    const categoriaRecuperada = await prisma.categoria.update({
        where: { id: "b35e732b-e87a-4731-8ae8-82ae15a92a4b" },
        data: { nome: 'banho' },
    })

    const ListaCategorias = await prisma.categoria.findMany();
    console.log(ListaCategorias);

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