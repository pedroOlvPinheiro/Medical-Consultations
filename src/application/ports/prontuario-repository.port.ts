import { Prontuario } from '../../core/entities/prontuario.entity';

export interface ProntuarioRepository {
  findById(id: string): Promise<Prontuario | null>;
  findByPacienteId(pacienteId: string): Promise<Prontuario[]>;
  findAll(): Promise<Prontuario[]>;
  save(prontuario: Prontuario): Promise<void>;
}
