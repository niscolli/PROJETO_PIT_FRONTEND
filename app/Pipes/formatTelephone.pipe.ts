import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    // Verifica se o valor não está vazio ou nulo
    if (!value) {
      return '';
    }

    // Remove todos os caracteres não numéricos do valor
    const numericValue = value.replace(/\D/g, '');

    // Formata o número de telefone à medida que os dígitos são digitados
    if (numericValue.length <= 3) {
      return numericValue;
    } else if (numericValue.length <= 6) {
      return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3)}`;
    } else {
      return `(${numericValue.slice(0, 3)}) ${numericValue.slice(
        3,
        6
      )}-${numericValue.slice(6)}`;
    }
  }
}
