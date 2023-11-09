import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  getProductsData() {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Café Espresso',
        description: 'Product Description',
        image:
          'https://img.elo7.com.br/product/zoom/268423E/painel-adesivo-cappuccino-cafe-expresso-leite-p-comercio-hd-parede.jpg',
        price: 10,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'Em Estoque',
        rating: 5,
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Mocha',
        description: 'Product Description',
        image:
          'https://uniquecafes.com.br/wp-content/uploads/2022/04/Passo-5-Mocha.webp',
        price: 23,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'Sem Estoque',
        rating: 4,
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Latte Macchiato',
        description: 'Product Description',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwnYt9l-ysJlJUCtv3I1feGpqcRUANq6kjfQ&usqp=CAU',
        price: 20,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'Baixo Estoque',
        rating: 3,
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'Macchiatela',
        description: 'Product Description',
        image:
          'https://sinhabenta.com.br/wp-content/uploads/2019/07/ice-cappuccino2.png',
        price: 29,
        category: 'Clothing',
        quantity: 25,
        inventoryStatus: 'Em Estoque',
        rating: 5,
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'Prensa Francesa',
        description: 'Product Description',
        image:
          'https://blog.coffeeandjoy.com.br/wp-content/uploads/2021/08/coffeeandjoy_como_fazer_cafe_na_prensa_francesa.jpg',
        price: 15,
        category: 'Accessories',
        quantity: 73,
        inventoryStatus: 'Em Estoque',
        rating: 4,
      },
    ];
  }

  getProductsMini() {
    return Promise.resolve(this.getProductsData().slice(0, 5));
  }

  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  }

  getProducts() {
    return Promise.resolve(this.getProductsData());
  }
}
