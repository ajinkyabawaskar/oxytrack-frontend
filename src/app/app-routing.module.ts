import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import { AuthGuard } from './helpers/auth.guard';
import { AddCylinderComponent } from './add-cylinder/add-cylinder.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'cylinder/add', component: AddCylinderComponent, canActivate: [AuthGuard]},
  {path: 'patient/add', component: RegisterPatientComponent, canActivate: [AuthGuard]},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent}
  // otherwise redirect to home
  // {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
