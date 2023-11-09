import { PitServiceService } from 'src/app/services/pit.service.service';
import { Component } from '@angular/core';
import { Compra } from 'src/app/Models/compra.models';
import { Product } from 'src/app/Models/product.models';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
})
export class RelatoriosComponent {
  compras!: Compra[];

  constructor(private pitService: PitServiceService) {}

  ngOnInit() {
    this.obterCompras();
  }

  obterCompras() {
    this.pitService.getCompras().subscribe(
      (dados: Compra[]) => {
        console.log(dados);
        this.compras = dados;
      },
      (error) => {
        console.error('Erro ao obter as compras', error);
      }
    );
  }
}
