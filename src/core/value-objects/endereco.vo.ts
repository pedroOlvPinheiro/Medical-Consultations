export class Endereco {
  constructor(
    public readonly rua: string,
    public readonly numero: string,
    public readonly bairro?: string,
    public readonly cidade?: string,
    public readonly estado?: string,
    public readonly cep?: string,
  ) {
    if (!rua || !numero) {
      throw new Error('Endereço inválido: rua e número são obrigatórios');
    }
  }

  toString(): string {
    return `${this.rua}, ${this.numero}${this.bairro ? ` - ${this.bairro}` : ''}${this.cidade ? `, ${this.cidade}` : ''}`;
  }
}
