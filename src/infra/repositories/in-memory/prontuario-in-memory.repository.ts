import { ProntuarioRepository } from '../../../application/ports/prontuario-repository.port';
import { Prontuario } from '../../../core/entities/prontuario.entity';

export class ProntuarioInMemoryRepository implements ProntuarioRepository {
  private prontuarios = new Map<string, Prontuario>();

  async findById(id: string): Promise<Prontuario | null> {
    return this.prontuarios.get(id) ?? null;
  }

  async findByPacienteId(pacienteId: string): Promise<Prontuario[]> {
    return Array.from(this.prontuarios.values()).filter(
      (prontuario) => prontuario.pacienteId === pacienteId,
    );
  }

  async save(prontuario: Prontuario): Promise<void> {
    this.prontuarios.set(prontuario.id, prontuario);
  }
}
