import { Paciente } from '../../core/entities/paciente.entity';

export interface PacienteRepository {
  findById(id: string): Promise<Paciente | null>;
  save(paciente: Paciente): Promise<void>;
}
