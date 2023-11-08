import { IDatasControle, KeyDatacontrole } from "@shared/domain/datas.types";
import { type } from "os";

interface ICategoria extends IDatasControle{
    id?:string;
    nome:string;
     
}

type CriarCategoriaProps = Omit<ICategoria, "id" | KeyDatacontrole>;

type RecuperarcategoriaProps = ICategoria & {
    id: NonNullable<ICategoria['id']>
}

export{ICategoria,CriarCategoriaProps, RecuperarcategoriaProps}