import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import{FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenderPipePipe } from './gender-pipe.pipe';
import { GenderLabelPipePipe } from './gender-label-pipe.pipe';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { AddToCartComponent } from './components/addtocart/addtocart.component';

@NgModule({
  declarations: [
    AppComponent,
    GenderPipePipe,
    GenderLabelPipePipe,
    HomeComponent,
    DashboardComponent,
    ProductsComponent,
    NavBarComponent,
    ProductAddComponent,
    ProductEditComponent,
    AddToCartComponent
  ],
  imports: [FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
