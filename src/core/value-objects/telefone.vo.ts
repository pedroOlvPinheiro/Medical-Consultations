export class Telefone {
  constructor(
    public readonly ddd: string,
    public readonly numero: string,
  ) {
    if (!/^\d{2,3}$/.test(ddd)) {
      throw new Error('DDD inválido');
    }
    if (!/^\d{6,9}$/.test(numero)) {
      throw new Error('Número de telefone inválido');
    }
  }

  toString(): string {
    return `(${this.ddd}) ${this.numero}`;
  }
}
