import { AtualizarCategoriaUseCase } from "@modules/catalogo/application/use-case/atualizar-categoria/atualizar-categoria.use-case";
import { RecuperarcategoriaProps } from "@modules/catalogo/domain/categoria/categoria.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class AtualizarCategoriaExpressController extends ExpressController {

    private _atualizarCategoriaUseCase: AtualizarCategoriaUseCase;

    constructor(atualizarCategoriaUseCase: AtualizarCategoriaUseCase) {
        super();
        this._atualizarCategoriaUseCase = atualizarCategoriaUseCase;
    } 

    async atualizar(request: Request, response: Response, next: NextFunction) {
        try {
            const categoriaInputDTO: RecuperarcategoriaProps = request.body as RecuperarcategoriaProps;
            const categoriaAtualizada: boolean = await this._atualizarCategoriaUseCase.execute(categoriaInputDTO);
            this.sendSuccessResponse(response,categoriaAtualizada);
        } catch (error) {
            next(error);
        }
    }

}

export { AtualizarCategoriaExpressController }