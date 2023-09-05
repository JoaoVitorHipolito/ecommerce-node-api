import { Categoria } from "../domain/categoria/categoria.entity";
import { ICategoria, RecuperarcategoriaProps } from "../domain/categoria/categoria.types";


class CategoriaMap {

    public static toDTO(categoria: Categoria): ICategoria {
        return {
            id: categoria.id,
            nome: categoria.nome
        }
    }

    public static toDomain(categoria: RecuperarcategoriaProps): Categoria {
        return Categoria.recuperar(categoria);
    }

}

export { CategoriaMap };
