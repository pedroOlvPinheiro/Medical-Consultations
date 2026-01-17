import { Paciente } from './core/entities/paciente.entity';
import { Consulta } from './core/entities/consulta.entity';

import { PacienteInMemoryRepository } from './infra/repositories/in-memory/paciente-in-memory.repository';
import { ConsultaInMemoryRepository } from './infra/repositories/in-memory/consulta-in-memory.repository';
import { ProntuarioInMemoryRepository } from './infra/repositories/in-memory/prontuario-in-memory.repository';

import { RegistrarProntuarioUseCase } from './application/use-cases/registrar-prontuario.usecase';

async function bootstrap() {
  //Adapters (infraestrutura)
  const pacienteRepo = new PacienteInMemoryRepository();
  const consultaRepo = new ConsultaInMemoryRepository();
  const prontuarioRepo = new ProntuarioInMemoryRepository();

  //Use Case
  const registrarProntuario = new RegistrarProntuarioUseCase(
    consultaRepo,
    prontuarioRepo,
    pacienteRepo,
  );

  //Entidades do domínio
  // NOTE: Paciente requer id, nome e dataNascimento (e outros opcionais)
  const paciente = new Paciente(
    'paciente-1',
    'João da Silva',
    new Date('1990-01-01'), // dataNascimento obrigatória
  );

  // Consulta: id, horario, pacienteId, medicoId
  const consulta = new Consulta(
    'consulta-1',
    new Date(),
    paciente.id,
    'medico-1',
  );

  //Persistência inicial (in-memory)
  await pacienteRepo.save(paciente);
  await consultaRepo.save(consulta);

  //Execução do caso de uso
  const prontuario = await registrarProntuario.execute({
    consultaId: consulta.id,
    // Campos opcionais do input:
    pesoKg: 72.5,
    alturaCm: 175,
    sintomas: 'Tosse leve e febre baixa',
    observacaoClinica: 'Paciente relatou melhora após medicação.',
  });

  //Verificação
  const prontuarios = await prontuarioRepo.findByPacienteId(paciente.id);
  console.log('Prontuário criado:', prontuario);
  console.log('Prontuários do paciente:', prontuarios);
}

bootstrap().catch((err) => {
  console.error('Erro no bootstrap:', err);
  process.exit(1);
});
