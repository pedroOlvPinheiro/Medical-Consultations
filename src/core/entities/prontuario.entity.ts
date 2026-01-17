export type Prescricao = {
  medicamentoId: string;
  dosagem: string;
  via: string;
  duracao: string;
};

export class Prontuario {
  public prescricoes: Prescricao[] = [];
  public examesSolicitados: string[] = [];

  constructor(
    public readonly id: string,
    public readonly consultaId: string,
    public readonly pacienteId: string,
    public readonly medicoId: string,
    public pesoKg?: number,
    public alturaCm?: number,
    public sintomas?: string,
    public observacaoClinica?: string,
  ) {
    if (!id) throw new Error('Prontuario deve ter id');
    if (!consultaId) throw new Error('Prontuario deve referenciar consultaId');
    if (!pacienteId) throw new Error('Prontuario deve referenciar pacienteId');
    if (!medicoId) throw new Error('Prontuario deve referenciar medicoId');
  }

  adicionarPrescricao(p: Prescricao) {
    if (!p || !p.medicamentoId) throw new Error('Prescrição inválida');
    this.prescricoes.push(p);
  }

  solicitarExame(exameId: string) {
    if (!exameId) throw new Error('Exame inválido');
    this.examesSolicitados.push(exameId);
  }
}
