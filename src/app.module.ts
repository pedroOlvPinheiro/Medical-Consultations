import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { ProntuarioController } from './infra/http/controllers/prontuario.controller';
import { RegistrarProntuarioUseCase } from './application/use-cases/registrar-prontuario.usecase';
import { ListarProntuariosUseCase } from './application/use-cases/listar-prontuarios.usecase';
import { ConsultaInMemoryRepository } from './infra/repositories/in-memory/consulta-in-memory.repository';
import { PacienteInMemoryRepository } from './infra/repositories/in-memory/paciente-in-memory.repository';
import { ProntuarioInMemoryRepository } from './infra/repositories/in-memory/prontuario-in-memory.repository';
import { ConsoleSmsAdapter } from './infra/adapters/console-sms.adapter';
import { ConsultaRepository } from './application/ports/consulta-repository.port';
import { PacienteRepository } from './application/ports/paciente-repository.port';
import { Paciente } from './core/entities/paciente.entity';
import { Consulta } from './core/entities/consulta.entity';
import { Telefone } from './core/value-objects/telefone.vo';

@Module({
  imports: [],
  controllers: [ProntuarioController],
  providers: [
    RegistrarProntuarioUseCase,
    ListarProntuariosUseCase,
    { provide: 'ConsultaRepository', useClass: ConsultaInMemoryRepository },
    { provide: 'ProntuarioRepository', useClass: ProntuarioInMemoryRepository },
    { provide: 'PacienteRepository', useClass: PacienteInMemoryRepository },
    { provide: 'NotificacaoService', useClass: ConsoleSmsAdapter },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject('ConsultaRepository')
    private readonly consultaRepo: ConsultaRepository,
    @Inject('PacienteRepository')
    private readonly pacienteRepo: PacienteRepository,
  ) {}

  async onModuleInit() {
    const telefone = new Telefone('98', '999998888');
    const paciente1 = new Paciente(
      'paciente-1',
      'Victor Martins',
      new Date('2000-01-01'),
      'M',
      undefined,
      [telefone],
    );
    const consulta1 = new Consulta(
      'consulta-1',
      new Date(),
      paciente1.id,
      'medico-1',
    );

    await this.pacienteRepo.save(paciente1);
    await this.consultaRepo.save(consulta1);

    const paciente2 = new Paciente(
      'paciente-2',
      'João Pedro',
      new Date('2000-01-02'),
    );

    const consulta2 = new Consulta(
      'consulta-2',
      new Date(),
      paciente2.id,
      'medico-1',
    );

    await this.pacienteRepo.save(paciente2);
    await this.consultaRepo.save(consulta2);

    console.log('🌱 Dados de teste inseridos: 2 Pacientes e 2 Consultas');
  }
}
