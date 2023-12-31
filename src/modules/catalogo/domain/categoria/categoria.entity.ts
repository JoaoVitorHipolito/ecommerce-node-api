import { Entity } from "@shared/domain/entity";
import { CategoriaMap } from "@modules/catalogo/infra/database/mappers/categoria.map";
import { NomeCategoriaNuloOuIndefinido, NomeCategoriaTamanhoMaximoInvalido, NomeCategoriaTamanhoMinimoInvalido } from "./categoria.exception";
import { ICategoria, RecuperarcategoriaProps, criarcategoriaProps } from "./categoria.types";


class Categoria extends Entity<ICategoria> implements ICategoria {

    ///////////////////////
    //Atributos de Classe//
    ///////////////////////

    private _nome: string;
    private _dataCriacao?: Date | undefined;
	private _dataAtualizacao?: Date | undefined;

    //////////////
    //Constantes//
    //////////////

    public static readonly TAMANHO_MINIMO_NOME = 3;
    public static readonly TAMANHO_MAXIMO_NOME = 50;
    
   

    ///////////////
    //Gets e Sets//
    ///////////////

    public get nome(): string {
        return this._nome;
    }

    private set nome(nome: string) {

        const tamanhoNome = nome.trim().length;

        if (nome === null || nome === undefined) {
            throw new NomeCategoriaNuloOuIndefinido();
        }

        if (tamanhoNome < Categoria.TAMANHO_MINIMO_NOME) {
            throw new NomeCategoriaTamanhoMinimoInvalido();
        }

        if (tamanhoNome > Categoria.TAMANHO_MAXIMO_NOME) {
            throw new NomeCategoriaTamanhoMaximoInvalido();
        }

        this._nome = nome;
    }

    public get dataCriacao(): Date | undefined {
        return this._dataCriacao;
    }
    private set dataCriacao(dataCriacao: Date | undefined) {
        this._dataCriacao = dataCriacao;
    }

    public get dataAtualizacao(): Date | undefined {
        return this._dataAtualizacao;
    }
    private set dataAtualizacao(dataAtualizacao: Date | undefined) {
        this._dataAtualizacao = dataAtualizacao;
    }

    //////////////
    //Construtor//
    //////////////

    private constructor(categoria:ICategoria){
        super(categoria.id);
        this.nome = categoria.nome;
        this.dataCriacao = categoria.dataCriacao;
        this.dataAtualizacao = categoria.dataAtualizacao;
    }

    /////////////////////////
    //Static Factory Method//
    /////////////////////////

    public static criar(props: criarcategoriaProps): Categoria {
        return new Categoria( props );
    }

    public static recuperar(props: RecuperarcategoriaProps): Categoria {
        return new Categoria(props);
    }

    public toDTO(): ICategoria {
        return CategoriaMap.toDTO(this); 
    }

   

}

export { Categoria };
