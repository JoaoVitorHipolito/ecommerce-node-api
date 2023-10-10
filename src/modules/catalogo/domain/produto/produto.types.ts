import { type } from "os";
import { Categoria } from "../categoria/categoria.entity";
import { IDatasControle, KeyDatacontrole } from "@shared/datas.types";

interface IProduto extends IDatasControle {
    id?: string;
    nome: string;
    descricao: string;
    valor:number;
    categorias: Array<Categoria>
}

type criarProdutoProps = Omit<IProduto,"id" | KeyDatacontrole>;

type RecuperarProdutoProps = IProduto & {
    id: NonNullable<IProduto['id']>
}

export{
    IProduto,
    criarProdutoProps,
    RecuperarProdutoProps,
    
}