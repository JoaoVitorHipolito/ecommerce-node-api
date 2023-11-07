import { type } from "os";
import { Categoria } from "../categoria/categoria.entity";
import { IDatasControle, KeyDatacontrole } from "@shared/domain/datas.types";
import { ICategoria } from "../categoria/categoria.types";

enum StatusProduto {
    ATIVO = "ATIVO",
    DESATIVO = "DESATIVO"
}
interface IProduto extends IDatasControle {
    id?: string;
    nome: string;
    descricao: string;
    valor:number;
    categorias: Array<ICategoria>;
    status?: StatusProduto
}

type criarProdutoProps = Omit<IProduto,"id" | KeyDatacontrole | "status">;

type RecuperarProdutoProps = IProduto & {
    id: NonNullable<IProduto['id']>
}

export{
    IProduto,
    criarProdutoProps,
    RecuperarProdutoProps,
    StatusProduto
    
}