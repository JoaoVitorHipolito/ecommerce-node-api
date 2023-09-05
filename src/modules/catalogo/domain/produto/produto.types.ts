import { type } from "os";
import { Categoria } from "../categoria/categoria.entity";

interface IProduto {
    id?: string;
    nome: string;
    descricao: string;
    valor:number;
    categorias: Array<Categoria>
}

type criarProdutoProps = Omit<IProduto,"id">;

type RecuperarProdutoProps = Required<IProduto>;

export{
    IProduto,
    criarProdutoProps,
    RecuperarProdutoProps,
    
}