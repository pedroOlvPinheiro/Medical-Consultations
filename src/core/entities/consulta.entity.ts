export type ConsultaStatus = 'AGENDADA' | 'REALIZADA' | 'CANCELADA';

export class Consulta {
  public prontuarioId?: string;
  public status: ConsultaStatus;

  constructor(
    public readonly id: string,
    public readonly horario: Date,
    public readonly pacienteId: string,
    public readonly medicoId: string,
    public ehPacienteNovo: boolean = false,
  ) {
    if (!id) throw new Error('Consulta deve ter id');
    if (!horario || !(horario instanceof Date))
      throw new Error('Horario inválido');
    if (!pacienteId) throw new Error('Consulta sem pacienteId');
    if (!medicoId) throw new Error('Consulta sem medicoId');

    this.status = 'AGENDADA';
  }

  marcarRealizada(prontuarioId?: string) {
    if (this.status === 'CANCELADA')
      throw new Error('Não é possível realizar consulta cancelada');
    this.status = 'REALIZADA';
    if (prontuarioId) this.prontuarioId = prontuarioId;
  }

  cancelar() {
    if (this.status === 'REALIZADA')
      throw new Error('Não é possível cancelar consulta já realizada');
    this.status = 'CANCELADA';
  }
}
