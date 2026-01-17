import { PacienteRepository } from '../../../application/ports/paciente-repository.port';
import { Paciente } from '../../../core/entities/paciente.entity';

export class PacienteInMemoryRepository implements PacienteRepository {
  private pacientes = new Map<string, Paciente>();

  async findById(id: string): Promise<Paciente | null> {
    return this.pacientes.get(id) ?? null;
  }

  async save(paciente: Paciente): Promise<void> {
    this.pacientes.set(paciente.id, paciente);
  }
}
