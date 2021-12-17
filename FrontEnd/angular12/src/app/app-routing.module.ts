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
import {AdminGuard} from "./guardian/admin.guard";
import {UserGuard} from "./guardian/user.guard";



const routes: Routes = [
  {
    path:'',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent


  },
  {
    path: 'registro',
    component: RegisterComponent
  ,canActivate: [UserGuard]


},
  {
    path: 'baja',
    component: BajaComponent
    ,canActivate: [UserGuard]

  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]

  },
  {
    path: 'microchip',
    component: MicrochipComponent
    ,canActivate: [UserGuard]

  },
  {
    path: 'inventario',
    component: InventarioComponent
    ,canActivate: [UserGuard]

  },
  {
    path: 'gerencial',
    component: GerencialComponent
    ,canActivate: [UserGuard]

  },
  {
    path: 'taxonomia',
    component: TaxonomiaComponent
    ,canActivate: [UserGuard]

  },
  {
    path: 'monitoreo',
    component: MonitoreoComponent
    ,canActivate: [UserGuard]

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
