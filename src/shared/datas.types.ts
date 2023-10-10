interface IDatasControle{
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    dataExclusao?: Date | null;
}

type KeyDatacontrole = keyof IDatasControle;

export {IDatasControle, KeyDatacontrole}