import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { HomeComponent } from './componentes/home/home.component';
import { SobreComponent } from './componentes/sobre/sobre.component';
import { AdmComponent } from './componentes/adm/adm.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';
import { ContatoComponent } from './componentes/contato/contato.component';

import { CarouselModule } from 'primeng/carousel';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ProductService } from './services/product.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { TableModule } from 'primeng/table';
import { RelatoriosComponent } from './componentes/relatorios/relatorios.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    HomeComponent,
    SobreComponent,
    AdmComponent,
    ProdutosComponent,
    ContatoComponent,
    LoaderComponent,
    RelatoriosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    TagModule,
    DialogModule,
    BrowserAnimationsModule,
    ToastModule,
    InputMaskModule,
    InputNumberModule,
    HttpClientModule,
    TableModule,
    ConfirmDialogModule
  ],
  providers: [ProductService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
