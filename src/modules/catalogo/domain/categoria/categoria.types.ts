import { type } from "os";

interface ICategoria{
    id?:string;
    nome:string;
     
}

type criarcategoriaProps = Omit<ICategoria, "id">;

type RecuperarcategoriaProps = Required<ICategoria>;

export{ICategoria,criarcategoriaProps, RecuperarcategoriaProps}