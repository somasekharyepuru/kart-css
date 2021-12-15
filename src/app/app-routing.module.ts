import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/authentication/components/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    loadChildren: './modules/products/products.module#ProductsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: './modules/authentication/authentication.module#AuthenticationModule',
  },
  {
    path: 'cart',
    loadChildren: './modules/cart/cart.module#CartModule',
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
