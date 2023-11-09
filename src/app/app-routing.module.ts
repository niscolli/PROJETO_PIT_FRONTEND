import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NgModule, Component } from '@angular/core';
import { SobreComponent } from './componentes/sobre/sobre.component';
import { AdmComponent } from './componentes/adm/adm.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RelatoriosComponent } from './componentes/relatorios/relatorios.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sobre',
    component: SobreComponent,
  },
  {
    path: 'adm',
    component: AdmComponent,
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
  },
  {
    path: 'contato',
    component: ContatoComponent,
  },
  {
    path: 'adm/relatorios',
    component: RelatoriosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
