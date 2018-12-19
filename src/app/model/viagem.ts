import { ViagemDetalhe } from "./viagem.detalhe";

export class Viagem {
    id: number;
    idFuncionarios: Array<number>;
    detalhes: Array<ViagemDetalhe>;
    saida: Date;
    retorno: Date;
}