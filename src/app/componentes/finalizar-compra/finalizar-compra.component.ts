import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-finalizar-compra',
  template: `
    <div class="container mt-4">
      <h2>Finalizar Compra</h2>
      <div class="card p-4">
        <h4>Resumo do Pedido</h4>
        <ul class="list-group mb-3">
          <li class="list-group-item" *ngFor="let item of cartItems">
            {{ item.name }} - {{ item.quantity }} x R$ {{ item.price }}
          </li>
          <li class="list-group-item">
            <strong>Total: R$ {{ total }}</strong>
          </li>
        </ul>
        <h4>Dados do Cartão de Crédito</h4>
        <form [formGroup]="paymentForm" (ngSubmit)="confirmarCompra()">
          <div class="form-group mb-3">
            <label for="cardNumber">Número do Cartão</label>
            <p-inputMask
              mask="9999 9999 9999 9999"
              formControlName="cardNumber"
              placeholder="1234 5678 9012 3456"
              [autoClear]="false"
            ></p-inputMask>
            <div
              *ngIf="
                !cardNumber.valid && (cardNumber.touched || formSubmitted)
              "
              class="invalid-feedback"
              style="color: #cc0033;"
            >
              Por favor, insira um número de cartão válido.
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="cvv">CVV</label>
            <p-inputMask
              mask="999"
              formControlName="cvv"
              placeholder="123"
              [autoClear]="false"
            ></p-inputMask>
            <div
              *ngIf="!cvv.valid && (cvv.touched || formSubmitted)"
              class="invalid-feedback"
              style="color: #cc0033;"
            >
              Por favor, insira um CVV válido.
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="expirationDate">Data de Validade</label>
            <p-inputMask
              mask="99/99"
              formControlName="expirationDate"
              placeholder="MM/AA"
              [autoClear]="false"
            ></p-inputMask>
            <div
              *ngIf="
                !expirationDate.valid &&
                (expirationDate.touched || formSubmitted)
              "
              class="invalid-feedback"
              style="color: #cc0033;"
            >
              Por favor, insira uma data de validade válida.
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="cardholderName">Nome do Titular</label>
            <input
              type="text"
              class="form-control"
              id="cardholderName"
              formControlName="cardholderName"
            />
            <div
              *ngIf="
                !cardholderName.valid &&
                (cardholderName.touched || formSubmitted)
              "
              class="invalid-feedback"
              style="color: #cc0033;"
            >
              Por favor, insira o nome do titular.
            </div>
          </div>
          <button type="submit" class="btn btn-success mt-3">
            Confirmar Compra
          </button>
          <div
            *ngIf="formInvalid"
            class="alert alert-danger mt-3"
            style="color: #cc0033;"
          >
            Por favor, preencha todos os campos do formulário corretamente.
          </div>
        </form>
      </div>
    </div>

    <p-toast></p-toast>
  `,
  standalone: true,
  imports: [ToastModule, ReactiveFormsModule, CommonModule, InputMaskModule],
})
export class FinalizarCompraComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  formInvalid: boolean = false;
  formSubmitted: boolean = false;
  paymentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      expirationDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$'),
        ],
      ],
      cardholderName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get cardNumber(): FormControl {
    return this.paymentForm.get('cardNumber') as FormControl;
  }

  get cvv(): FormControl {
    return this.paymentForm.get('cvv') as FormControl;
  }

  get expirationDate(): FormControl {
    return this.paymentForm.get('expirationDate') as FormControl;
  }

  get cardholderName(): FormControl {
    return this.paymentForm.get('cardholderName') as FormControl;
  }

  confirmarCompra() {
    this.formSubmitted = true;
    this.markAllAsTouched();
    if (this.paymentForm.valid) {
      console.log('Cartão de Crédito:', this.paymentForm.value);
      this.cartService.clearCart();
      this.messageService.add({
        severity: 'success',
        summary: 'Compra Realizada',
        detail: 'Sua compra foi realizada com sucesso!',
      });
      this.formInvalid = false;
    } else {
      this.formInvalid = true;
      console.log('Formulário inválido');
    }
  }

  private markAllAsTouched() {
    Object.values(this.paymentForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
