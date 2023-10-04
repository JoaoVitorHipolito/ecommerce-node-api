/*
  Warnings:

  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "produtos_categorias" DROP CONSTRAINT "produtos_categorias_categoria_id_fkey";

-- DropTable
DROP TABLE "categoria";

-- CreateTable
CREATE TABLE "categorias" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_altualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produtos_categorias" ADD CONSTRAINT "produtos_categorias_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
