export class Compra {
  quantidade: number;
  valor?: number;
  endereco?: string;
  telefone?: number;
  produto?: string;

  constructor(
    quantidade: number,
    valor: number,
    endereco: string,
    telefone: number,
    produto: string
  ) {
    this.quantidade = quantidade;
    this.valor = valor;
    this.endereco = endereco;
    this.telefone = telefone;
    this.produto = produto;
  }
}
