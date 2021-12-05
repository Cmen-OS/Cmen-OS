import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { BajaComponent } from './screens/baja/baja.component';
import { AdminComponent } from './screens/admin/admin.component';
import { RegisterComponent } from './screens/register/register.component';
import { MicrochipComponent } from './screens/microchip/microchip.component';
import { InventarioComponent } from './screens/inventario/inventario.component';
import { GerencialComponent } from './screens/gerencial/gerencial.component';
import { TaxonomiaComponent } from './screens/taxonomia/taxonomia.component';
import { MonitoreoComponent } from './screens/monitoreo/monitoreo.component';
import { SalirComponent } from './screens/salir/salir.component';
import {LoginComponent} from "./screens/login/login.component";



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegisterComponent
  },
  {
    path: 'baja',
    component: BajaComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'microchip',
    component: MicrochipComponent
  },
  {
    path: 'inventario',
    component: InventarioComponent
  },
  {
    path: 'gerencial',
    component: GerencialComponent
  },
  {
    path: 'taxonomia',
    component: TaxonomiaComponent
  },
  {
    path: 'monitoreo',
    component: MonitoreoComponent
  },
  {
    path: 'salir',
    component: SalirComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
