import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Compra } from 'src/app/Models/compra.models';
import { Product } from 'src/app/Models/product.models';
import { PitServiceService } from 'src/app/services/pit.service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0, 0, 0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class ProdutosComponent implements OnInit {
  products: Product[] = [];

  responsiveOptions: any[] = [];
  visible: boolean = false;

  produtoAtual!: Product;
  rua!: any;
  numero: any = '';
  telefone: string = '';
  quantidade!: number;

  isLoading: boolean = false;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private pitService: PitServiceService
  ) {}

  ngOnInit() {
    this.productService.getProductsSmall().then((products) => {
      this.products = products;
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  showDialog(item: any) {
    if (item.inventoryStatus === 'Sem Estoque') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Esse item está indisponível no momento',
      });
      this.visible = false;
    } else {
      this.visible = true;
      this.rua = '';
      this.numero = '';
      this.telefone = '';
      this.quantidade = 1;
      this.produtoAtual = item;
    }
  }

  async persistirCompra() {
    this.isLoading = true;
    const valor =
      this.produtoAtual && this.produtoAtual.price !== undefined
        ? this.produtoAtual.price
        : 0;

    const endereco = `${this.rua}, ${this.numero}`;

    let telefone = this.telefone.replace(/[^0-9]/g, '');
    let telefoneNumerico = parseInt(telefone, 10);

    const nomeProduto =
      this.produtoAtual && this.produtoAtual.name !== undefined
        ? this.produtoAtual.name
        : '';

    const novaCompra: Compra = new Compra(
      this.quantidade,
      valor,
      endereco,
      telefoneNumerico,
      nomeProduto
    );

    this.isLoading = true;

    const resultado: boolean = await this.pitService.persistirCompra(
      novaCompra
    );
    if (!resultado) {
      this.isLoading = resultado;
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Em Estoque':
        return 'success';
      case 'Baixo Estoque':
        return 'warning';
      case 'Sem Estoque':
        return 'danger';
      default:
        return 'danger';
    }
  }
}
