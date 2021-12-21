import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './screens/register/register.component';
import { BoxComponent } from './box/box.component';
import { BajaComponent } from './screens/baja/baja.component';
import { AdminComponent } from './screens/admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { MicrochipComponent } from './screens/microchip/microchip.component';
import { InventarioComponent } from './screens/inventario/inventario.component';
import { GerencialComponent } from './screens/gerencial/gerencial.component';
import { TaxonomiaComponent } from './screens/taxonomia/taxonomia.component';
import { MonitoreoComponent } from './screens/monitoreo/monitoreo.component';
import { SalirComponent } from './screens/salir/salir.component';
import { LoginComponent } from './screens/login/login.component';

import { CookieService } from 'ngx-cookie-service';
import { ListaAnimalesComponent } from './dialog/lista-animales/lista-animales.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { ListaAnimalesMicrochipComponent } from './dialog/lista-animales-microchip/lista-animales-microchip.component';
import { CambiarAnimalComponent } from './dialog/cambiar-animal/cambiar-animal.component';
import {ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    BoxComponent,
    BajaComponent,
    AdminComponent,
    MicrochipComponent,
    InventarioComponent,
    GerencialComponent,
    TaxonomiaComponent,
    MonitoreoComponent,
    SalirComponent,
    LoginComponent,
    ListaAnimalesComponent,
    ListaAnimalesMicrochipComponent,
    CambiarAnimalComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ChartsModule
  ],
  providers:
    [CookieService],
  bootstrap: [AppComponent]

})
export class AppModule { }
