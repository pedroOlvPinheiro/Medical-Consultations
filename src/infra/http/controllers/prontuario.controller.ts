import { Controller, Post, Body, Get } from '@nestjs/common';
import {
  RegistrarProntuarioUseCase,
  RegistrarProntuarioInput,
} from '../../../application/use-cases/registrar-prontuario.usecase';
import { ListarProntuariosUseCase } from '../../../application/use-cases/listar-prontuarios.usecase';

@Controller('prontuarios')
export class ProntuarioController {
  constructor(
    private readonly registrarProntuario: RegistrarProntuarioUseCase,
    private readonly listarProntuarios: ListarProntuariosUseCase,
  ) {}

  @Post()
  async create(@Body() body: RegistrarProntuarioInput) {
    return await this.registrarProntuario.execute(body);
  }

  @Get()
  async findAll() {
    return await this.listarProntuarios.execute();
  }
}
