import { Injectable, Inject } from '@nestjs/common';
import { PacienteRepository } from '../ports/paciente-repository.port';
import { ConsultaRepository } from '../ports/consulta-repository.port';
import { ProntuarioRepository } from '../ports/prontuario-repository.port';
import { NotificacaoService } from '../ports/notificacao-service.port';
import { Prontuario } from '../../core/entities/prontuario.entity';

export type RegistrarProntuarioInput = {
  consultaId: string;
  pesoKg?: number;
  alturaCm?: number;
  sintomas?: string;
  observacaoClinica?: string;
};

@Injectable()
export class RegistrarProntuarioUseCase {
  constructor(
    @Inject('ConsultaRepository')
    private readonly consultaRepository: ConsultaRepository,
    @Inject('ProntuarioRepository')
    private readonly prontuarioRepository: ProntuarioRepository,
    @Inject('PacienteRepository')
    private readonly pacienteRepository: PacienteRepository,
    @Inject('NotificacaoService')
    private readonly notificacaoService: NotificacaoService,
  ) {}

  async execute(input: RegistrarProntuarioInput): Promise<Prontuario> {
    const consulta = await this.consultaRepository.findById(input.consultaId);

    if (!consulta) {
      throw new Error('Consulta não encontrada');
    }

    if (consulta.prontuarioId) {
      throw new Error('Esta consulta já possui um prontuário');
    }

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

    await this.prontuarioRepository.save(prontuario);

    consulta.marcarRealizada(prontuario.id);
    await this.consultaRepository.save(consulta);

    const paciente = await this.pacienteRepository.findById(
      consulta.pacienteId,
    );

    if (paciente) {
      if (input.pesoKg) paciente.registrarPeso(input.pesoKg);
      if (input.alturaCm) paciente.registrarAltura(input.alturaCm);
      paciente.adicionarProntuario(prontuario.id);

      await this.pacienteRepository.save(paciente);

      if (paciente.telefones.length > 0) {
        const telefonePrincipal = paciente.telefones[0].toString();
        const mensagem = `Olá ${paciente.nome}, seu atendimento foi finalizado. Prontuário ID: ${prontuario.id}`;
        await this.notificacaoService.enviarSMS(telefonePrincipal, mensagem);
      }
    }

    return prontuario;
  }
}
