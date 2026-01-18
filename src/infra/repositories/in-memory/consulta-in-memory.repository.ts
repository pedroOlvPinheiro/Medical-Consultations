import { ConsultaRepository } from '../../../application/ports/consulta-repository.port';
import { Consulta } from '../../../core/entities/consulta.entity';

export class ConsultaInMemoryRepository implements ConsultaRepository {
  private consultas = new Map<string, Consulta>();

  findById(id: string): Promise<Consulta | null> {
    const consulta = this.consultas.get(id) ?? null;
    return Promise.resolve(consulta);
  }

  findConsultasDoDia(date: Date): Promise<Consulta[]> {
    const targetDate = date.toDateString();

    const resultado = Array.from(this.consultas.values()).filter(
      (consulta) => consulta.horario.toDateString() === targetDate,
    );

    return Promise.resolve(resultado);
  }

  save(consulta: Consulta): Promise<void> {
    this.consultas.set(consulta.id, consulta);
    return Promise.resolve();
  }
}
