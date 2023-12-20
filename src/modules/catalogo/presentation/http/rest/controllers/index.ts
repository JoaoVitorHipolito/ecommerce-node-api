import { atualizarCategoriaUseCase, deletarCategoriaUseCase, inserirCategoriaUseCase, recuperarCategoriaPorIdUseCase, recuperarTodasCategoriasUseCase, recuperarTodosProdutoPorUseCase } from "@modules/catalogo/application/use-case"
import { RecuperarTodasCategoriaExpressController } from "./recuperar-todas-categorias.express.controller";
import { InserirCategoriaExpressController } from "./inserir-categoria.express.controller";
import { AtualizarCategoriaExpressController } from "./atualizar-categoria.express.controller";
import { RecuperarCategoriaPorIdExpressController } from "./recuperar-categoria-por-id.express.controller";
import { DeletarCategoriaExpressController } from "./deletar-categoria.express.controller";
import { RecuperarTodosProdutosUseCase } from "@modules/catalogo/application/use-case/recuperar-todos-produtos/recuperar-todos-produtos.use-case";
import { RecuperarTodosProdutoExpressController } from "./recuperar-todos-produtos.express.controller";

const recuperarCategoriaPorIdController = new RecuperarCategoriaPorIdExpressController(recuperarCategoriaPorIdUseCase);
const recuperarTodasCategoriasController = new RecuperarTodasCategoriaExpressController(recuperarTodasCategoriasUseCase);
const inserirCategoriaController = new InserirCategoriaExpressController(inserirCategoriaUseCase);
const atualizarCategoriaController = new AtualizarCategoriaExpressController(atualizarCategoriaUseCase);
const deletarCategoriaController = new DeletarCategoriaExpressController(deletarCategoriaUseCase);

const recuperarTodosProdutosController = new RecuperarTodosProdutoExpressController(recuperarTodosProdutoPorUseCase);

export {
    recuperarCategoriaPorIdController,
    recuperarTodasCategoriasController,
    inserirCategoriaController,
    atualizarCategoriaController,
    deletarCategoriaController,
    recuperarTodosProdutosController
}
