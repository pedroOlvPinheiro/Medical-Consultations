import { PacienteRepository } from '../../../application/ports/paciente-repository.port';
import { Paciente } from '../../../core/entities/paciente.entity';

export class PacienteInMemoryRepository implements PacienteRepository {
  private pacientes = new Map<string, Paciente>();

  findById(id: string): Promise<Paciente | null> {
    const paciente = this.pacientes.get(id) ?? null;
    return Promise.resolve(paciente);
  }

  save(paciente: Paciente): Promise<void> {
    this.pacientes.set(paciente.id, paciente);
    return Promise.resolve();
  }
}
