import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
})
export class ContatoComponent implements OnInit {
  nome!: string;
  email!: string;
  assunto!: string;
  mensagem!: string;

  constructor() {}

  ngOnInit() {}
}
