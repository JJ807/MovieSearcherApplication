import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MovieComponent} from './home/movie/movie.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {PersonComponent} from './home/person/person.component';
import {RouterModule} from "@angular/router";
import {SpinnerComponent} from "./home/spinner/spinner.component";
import {SpinnerInterceptor} from "./spinner-service/spinner-interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {OverlayModule} from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    PersonComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    OverlayModule
  ],
  providers: [
    {
      // provide: ErrorHandler, useClass: HandleErrorService
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
