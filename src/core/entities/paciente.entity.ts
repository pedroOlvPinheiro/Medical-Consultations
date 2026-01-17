import { Endereco } from '../value-objects/endereco.vo';
import { Telefone } from '../value-objects/telefone.vo';

export class Paciente {
  public prontuariosIds: string[] = [];
  public historicoPeso: Array<{ date: Date; pesoKg: number }> = [];
  public historicoAltura: Array<{ date: Date; alturaCm: number }> = [];

  constructor(
    public readonly id: string,
    public nome: string,
    public dataNascimento: Date,
    public sexo: 'M' | 'F' | 'O' = 'O',
    public endereco?: Endereco,
    public telefones: Telefone[] = [],
    public planoSaudeId?: string,
  ) {
    if (!id) throw new Error('Paciente deve ter id');
    if (!nome) throw new Error('Paciente deve ter nome');
  }

  adicionarProntuario(prontuarioId: string) {
    if (!prontuarioId) throw new Error('Prontuário inválido');
    this.prontuariosIds.push(prontuarioId);
  }

  registrarPeso(pesoKg: number, date: Date = new Date()) {
    if (pesoKg <= 0) throw new Error('Peso inválido');
    this.historicoPeso.push({ date, pesoKg });
  }

  registrarAltura(alturaCm: number, date: Date = new Date()) {
    if (alturaCm <= 0) throw new Error('Altura inválida');
    this.historicoAltura.push({ date, alturaCm });
  }
}
