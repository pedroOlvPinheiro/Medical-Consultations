export interface NotificacaoService {
  enviarSMS(telefone: string, mensagem: string): Promise<void>;
}
