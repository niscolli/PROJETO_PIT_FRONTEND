import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/Models/login.models';
import { PitServiceService } from 'src/app/services/pit.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css'],
})
export class AdmComponent implements OnInit {
  usuario: any = '';
  senha: any = '';

  isLoading: boolean = false;

  constructor(private pitService: PitServiceService, private router: Router) {}

  ngOnInit() {}

  async login() {
    const novoLogin: Login = new Login(this.usuario, this.senha);

    this.isLoading = true;

    const resultado: boolean = await this.pitService.login(novoLogin);
    console.log(resultado);
    if (resultado) {
      this.router.navigate(['/adm/relatorios']);
    }
    this.isLoading = false;
  }
}
