import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { HomePageComponent } from '@modules/home/pages/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    loadChildren: () => import(`@modules/home/home.module`).then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import(`@modules/auth/auth.module`).then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
