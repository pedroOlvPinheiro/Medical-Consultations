import { Consulta } from '../../core/entities/consulta.entity';

export interface ConsultaRepository {
  findById(id: string): Promise<Consulta | null>;
  findConsultasDoDia(date: Date): Promise<Consulta[]>;
  save(consulta: Consulta): Promise<void>;
}
