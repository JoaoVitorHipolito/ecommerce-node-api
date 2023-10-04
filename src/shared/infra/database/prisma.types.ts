import { Prisma } from "@prisma/client";

const produtoIncludeCategoriaPrisma = Prisma.validator<Prisma.ProdutoInclude>()(
    {
        categorias:{
            include:{
                categoria:true
            }
        }
    }
);

type ProdutocomCategoriaPrisma = Prisma.ProdutoGetPayload<
{include: typeof produtoIncludeCategoriaPrisma;}
>

export { produtoIncludeCategoriaPrisma, ProdutocomCategoriaPrisma };
