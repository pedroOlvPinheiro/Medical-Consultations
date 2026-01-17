import { ConsultaRepository } from '../../../application/ports/consulta-repository.port';
import { Consulta } from '../../../core/entities/consulta.entity';

export class ConsultaInMemoryRepository implements ConsultaRepository {
  private consultas = new Map<string, Consulta>();

  async findById(id: string): Promise<Consulta | null> {
    return this.consultas.get(id) ?? null;
  }

  async findConsultasDoDia(date: Date): Promise<Consulta[]> {
    const targetDate = date.toDateString();

    return Array.from(this.consultas.values()).filter(
      (consulta) => consulta.horario.toDateString() === targetDate,
    );
  }

  async save(consulta: Consulta): Promise<void> {
    this.consultas.set(consulta.id, consulta);
  }
}
