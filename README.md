<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Sistema de Consultas Médicas - Arquitetura Hexagonal

Este projeto foi desenvolvido como parte da disciplina de **Padrões de Software e Refatoração** (Sistemas de Informação - IFMA).

O objetivo é implementar um módulo de gestão de Prontuários Médicos utilizando **Arquitetura Hexagonal (Ports and Adapters)**, garantindo o desacoplamento entre as regras de negócio (Domínio) e tecnologias externas (Frameworks, Banco de Dados e APIs).

## 🚀 Sobre o Projeto (Etapa 01)

O sistema simula o ambiente de atendimento do **Dr. Vilegas**, permitindo:
1.  **Registro de Prontuários:** O médico registra sintomas, diagnósticos e prescrições após uma consulta.
2.  **Listagem de Prontuários:** Visualização do histórico médico.
3.  **Notificações:** Envio simulado de SMS para o paciente ao finalizar o atendimento.

### Estrutura Hexagonal Implementada
* **Core (Domínio):** Entidades puras (`Consulta`, `Paciente`, `Prontuario`) sem dependências externas.
* **Application (Portas & Casos de Uso):** Interfaces (`Repositories`, `NotificacaoService`) e Regras de Negócio (`UseCases`).
* **Infra (Adaptadores):** Implementações concretas (`InMemoryRepository`, `ConsoleSmsAdapter`, `NestJS Controller`).

---

## 🛠️ Como Executar

Instalar dependências:
```bash
$ npm install

```

Rodar o projeto (Os dados de teste são gerados automaticamente ao iniciar):

```bash
$ npm run start:dev

```

### 🧪 Testando a API (Exemplo)

**Rota:** `POST http://localhost:3000/prontuarios`
**Body (JSON):**

```json
{
  "consultaId": "consulta-1",
  "pesoKg": 75.0,
  "alturaCm": 175,
  "sintomas": "Febre e dor de cabeça",
  "observacaoClinica": "Virose confirmada. Repouso."
}

```

*Obs: O sistema exibirá no terminal o log do envio de SMS simulado.*

---

## 📚 Etapa 02 - Evolução e Justificativas Arquiteturais

Abaixo descrevemos como o sistema evoluiria para atender novos requisitos, utilizando Padrões de Projeto e princípios SOLID.

### I. Atendimento Online (Pagamentos e Histórico)

Para suportar pagamentos online (Pix, Cartão, Convênio) e visualização segura.

* **Padrões de Projeto:**
* **Strategy:** Para alternar entre diferentes métodos de pagamento (`PagamentoPix`, `PagamentoCartao`) sem alterar a classe principal.
* **Proxy:** Para controlar o acesso ao histórico do paciente, garantindo que apenas usuários autorizados carreguem dados sensíveis (Lazy Loading).


* **Princípios SOLID:**
* **OCP (Open/Closed Principle):** Novos métodos de pagamento podem ser adicionados criando novas classes "Strategy", sem modificar o código existente de processamento.


* **Justificativa Hexagonal:**
* Os gateways de pagamento (Stripe, Pagar.me) seriam apenas **Adaptadores de Saída**. O Core desconhece a API externa, dependendo apenas de uma porta `IPagamentoService`.



### II. Notificações e Lembretes (Funcionalidade Implementada)

*Funcionalidade de envio de SMS simulado já implementada neste projeto.*

* **Padrões de Projeto:**
* **Observer (Event-Driven):** O sistema pode disparar eventos (`ConsultaAgendada`, `ProntuarioRegistrado`) e ter múltiplos "observadores" (Email, SMS, Push) reagindo a isso.
* **Adapter:** Utilizado na implementação atual (`ConsoleSmsAdapter`) para adaptar a interface de notificação para uma saída no console (ou API real futuramente).


* **Princípios SOLID:**
* **DIP (Dependency Inversion Principle):** O Caso de Uso depende da abstração `NotificacaoService` (Porta), e não da implementação concreta (Twilio/AWS).


* **Justificativa Hexagonal:**
* A lógica de "avisar o paciente" fica no Core. O "como avisar" (SMS, WhatsApp) é um detalhe de infraestrutura plugável via Adaptadores.



### III. Compartilhamento e Integração

Integração com sistemas externos de saúde e plataformas de terceiros.

* **Padrões de Projeto:**
* **Facade:** Para criar uma interface simplificada que mascara a complexidade de sistemas legados ou APIs de saúde complexas (HL7/FHIR).
* **Anti-Corruption Layer (ACL):** Uma camada de tradução para impedir que modelos de dados externos "sujem" o Domínio da aplicação.


* **Princípios SOLID:**
* **ISP (Interface Segregation Principle):** Criar interfaces específicas para cada integração (`IGovernoIntegration`, `ILaboratorioIntegration`) em vez de uma interface genérica gigante.


* **Justificativa Hexagonal:**
* Sistemas externos são tratados estritamente como **Adaptadores**. A ACL garante que o Hexágono permaneça puro, traduzindo DTOs externos para Entidades de Domínio.



### IV. Suporte a Múltiplas Clínicas (Multi-tenant)

Escalabilidade para atender diversos médicos e clínicas isoladamente.

* **Padrões de Projeto:**
* **Abstract Factory:** Para criar famílias de objetos relacionados a uma clínica específica (ex: configurações de prontuário personalizadas por clínica).
* **Decorator:** Para adicionar contexto de "Tenant" (Clínica ID) dinamicamente às requisições e repositórios sem alterar a lógica base.


* **Princípios SOLID:**
* **SRP (Single Responsibility Principle):** Separar a lógica de "quem é o cliente" (Tenant) da lógica de "o que o sistema faz" (Médica).


* **Justificativa Hexagonal:**
* O Domínio (Core) foca nas regras médicas, que são universais. A separação dos dados (qual banco acessar, qual schema usar) é resolvida nos **Adaptadores de Persistência**, mantendo a regra de negócio intacta e reutilizável.
