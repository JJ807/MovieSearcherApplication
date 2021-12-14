import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomeComponent},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
