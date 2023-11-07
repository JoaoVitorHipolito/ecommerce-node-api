interface IUseCase<InputDTO, OutputDTO>{
    execute(Input?: InputDTO): Promise<OutputDTO>;
}

export {IUseCase}
