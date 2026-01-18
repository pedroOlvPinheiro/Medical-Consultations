import { NotificacaoService } from '../../application/ports/notificacao-service.port';

export class ConsoleSmsAdapter implements NotificacaoService {
  enviarSMS(telefone: string, mensagem: string): Promise<void> {
    console.log(`\n📱 [SMS GATEWAY] Enviando para ${telefone}: "${mensagem}"`);
    return Promise.resolve();
  }
}
