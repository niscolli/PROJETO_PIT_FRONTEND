import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { Compra } from '../Models/compra.models';
import { MessageService } from 'primeng/api';
import { Login } from '../Models/login.models';

@Injectable({
  providedIn: 'root',
})
export class PitServiceService {
  private baseUrl: string = 'https://localhost:7041/Pit/';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  async persistirCompra(compra: Compra): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post(`${this.baseUrl}persistir-compra`, compra).subscribe(
        (resultado) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Parabéns!',
            detail: 'Item comprado com sucesso',
          });
          resolve(false);
        },
        (erro) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: 'Falha ao realizar a compra',
          });
          resolve(false);
        }
      );
    });
  }

  async login(login: Login): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post(`${this.baseUrl}login`, login).subscribe(
        (resultado) => {
          console.log(resultado);
          if (resultado == false) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro!',
              detail: 'Falha ao Realizar o Login!',
            });
            resolve(false);
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Bem Vindo ADM!',
              detail: 'Login Realizado Com Sucesso!',
            });
            resolve(true);
          }
        },
        (erro) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: 'Falha ao Realizar o Login!',
          });
          resolve(false);
        }
      );
    });
  }

  getCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.baseUrl + 'get-compras');
  }
}
