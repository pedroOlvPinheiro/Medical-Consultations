import { ProntuarioRepository } from '../../../application/ports/prontuario-repository.port';
import { Prontuario } from '../../../core/entities/prontuario.entity';

export class ProntuarioInMemoryRepository implements ProntuarioRepository {
  private prontuarios = new Map<string, Prontuario>();

  findAll(): Promise<Prontuario[]> {
    const todos = Array.from(this.prontuarios.values());
    return Promise.resolve(todos);
  }

  findById(id: string): Promise<Prontuario | null> {
    const prontuario = this.prontuarios.get(id) ?? null;
    return Promise.resolve(prontuario);
  }

  findByPacienteId(pacienteId: string): Promise<Prontuario[]> {
    const resultado = Array.from(this.prontuarios.values()).filter(
      (prontuario) => prontuario.pacienteId === pacienteId,
    );
    return Promise.resolve(resultado);
  }

  save(prontuario: Prontuario): Promise<void> {
    this.prontuarios.set(prontuario.id, prontuario);
    return Promise.resolve();
  }
}
