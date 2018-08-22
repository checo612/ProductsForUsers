import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '../../node_modules/@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// firebase
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule } from 'angularfire2/database';
import {environment} from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductComponent } from './components/products/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { MyUserComponent } from './pages/my-user/my-user.component';


import { Http, HttpModule } from '@angular/http';
import { UsersService } from './services/users/users.service';
import { AuthService } from './services/auth/auth.service';
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';
import { ModalCreateComponent } from './pages/login/modal-create/modal-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    MyUserComponent,
    ModalCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpModule

  ],
  providers: [AngularFireAuth], // son los servicios que se van a ocupar
  bootstrap: [AppComponent]
})
export class AppModule { }
