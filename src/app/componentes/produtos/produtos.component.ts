import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/Models/product.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  providers: [ConfirmationService]
})
export class ProdutosComponent implements OnInit {
  products: Product[] = [];
  responsiveOptions: any[] = [];
  cartItems: any[] = [];
  isLoading: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
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

    this.cartItems = this.cartService.getCartItems();
  }

  // Verifica a quantidade do produto no carrinho
  getCartQuantity(product: Product): number {
    const cartItem = this.cartItems.find(item => item.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  }

  // Adicionar produto ao carrinho
  adicionarAoCarrinho(product: any) {
    this.cartService.addProductToCart(product);
    this.cartItems = this.cartService.getCartItems();
    this.messageService.add({
      severity: 'success',
      summary: 'Adicionado ao Carrinho',
      detail: `${product.name} adicionado com sucesso!`
    });
  }

  // Confirmação para remover produto do carrinho
  confirmarRemocaoProduto(product: any) {
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja remover ${product.name} do seu carrinho?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cartService.removeProductFromCart(product.id);
        this.cartItems = this.cartService.getCartItems();
        this.messageService.add({
          severity: 'info',
          summary: 'Removido do Carrinho',
          detail: `${product.name} removido do carrinho.`
        });
      }
    });
  }

  // Navegar para a tela de finalização de compra
  finalizarCompra() {
    this.router.navigate(['/finalizar-compra']);
  }

  // Para definir o status do produto (estoque)
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
