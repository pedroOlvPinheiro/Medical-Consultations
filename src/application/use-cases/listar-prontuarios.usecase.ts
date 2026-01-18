import { Injectable, Inject } from '@nestjs/common';
import { ProntuarioRepository } from '../ports/prontuario-repository.port';
import { Prontuario } from '../../core/entities/prontuario.entity';

@Injectable()
export class ListarProntuariosUseCase {
  constructor(
    @Inject('ProntuarioRepository')
    private readonly prontuarioRepository: ProntuarioRepository,
  ) {}

  async execute(): Promise<Prontuario[]> {
    return await this.prontuarioRepository.findAll();
  }
}
