import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth/auth.service';

const routes: Routes =
[
{path: 'home', component: HomeComponent, canActivate: [AuthService]},
{path: 'products', component: ProductsComponent, canActivate: [AuthService]},
{path: '', component: HomeComponent,  canActivate: [AuthService]},
{path: 'login', component: LoginComponent},
{path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// {path: 'home/:uid', component: HomeComponent,  canActivate: [AuthService]} si se desea poner el id en una ruta
// se apunta de la siguiente manera
