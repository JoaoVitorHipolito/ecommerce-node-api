import { IDatasControle, KeyDatacontrole } from "@shared/domain/datas.types";
import { type } from "os";

interface ICategoria extends IDatasControle{
    id?:string;
    nome:string;
     
}

type criarcategoriaProps = Omit<ICategoria, "id" | KeyDatacontrole>;

type RecuperarcategoriaProps = ICategoria & {
    id: NonNullable<ICategoria['id']>
}

export{ICategoria,criarcategoriaProps, RecuperarcategoriaProps}