import { PacienteRepository } from '../ports/paciente-repository.port';
import { ConsultaRepository } from '../ports/consulta-repository.port';
import { ProntuarioRepository } from '../ports/prontuario-repository.port';
import { Prontuario } from '../../core/entities/prontuario.entity';

/**
 * Input do Use Case
 * (não é DTO de API, é contrato interno)
 */
export type RegistrarProntuarioInput = {
  consultaId: string;
  pesoKg?: number;
  alturaCm?: number;
  sintomas?: string;
  observacaoClinica?: string;
};

/**
 * Use Case: Registrar Prontuário
 */
export class RegistrarProntuarioUseCase {
  constructor(
    private readonly consultaRepository: ConsultaRepository,
    private readonly prontuarioRepository: ProntuarioRepository,
    private readonly pacienteRepository: PacienteRepository,
  ) {}

  async execute(input: RegistrarProntuarioInput): Promise<Prontuario> {
    // Buscar consulta
    const consulta = await this.consultaRepository.findById(input.consultaId);

    if (!consulta) {
      throw new Error('Consulta não encontrada');
    }

    // Garantir que ainda não existe prontuário
    if (consulta.prontuarioId) {
      throw new Error('Esta consulta já possui um prontuário');
    }

    // Criar prontuário
    const prontuario = new Prontuario(
      crypto.randomUUID(),
      consulta.id,
      consulta.pacienteId,
      consulta.medicoId,
      input.pesoKg,
      input.alturaCm,
      input.sintomas,
      input.observacaoClinica,
    );

    // Persistir prontuário
    await this.prontuarioRepository.save(prontuario);

    // Atualizar consulta
    consulta.marcarRealizada(prontuario.id);
    await this.consultaRepository.save(consulta);

    // Atualizar histórico do paciente
    const paciente = await this.pacienteRepository.findById(
      consulta.pacienteId,
    );

    if (paciente) {
      if (input.pesoKg) paciente.registrarPeso(input.pesoKg);
      if (input.alturaCm) paciente.registrarAltura(input.alturaCm);
      paciente.adicionarProntuario(prontuario.id);

      await this.pacienteRepository.save(paciente);
    }

    // Retornar resultado
    return prontuario;
  }
}
