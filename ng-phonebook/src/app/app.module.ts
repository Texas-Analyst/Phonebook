import { BrowserModule } from "@angular/platform-browser";
import { platformBrowser } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactsComponent } from "./components/contact-list/contacts.component";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { HttpMockRequestInterceptor } from "./services/http-mock-request-interceptor.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, ContactsComponent, ContactFormComponent],
  exports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
  // Eliminates NG0403 error --- Bootstrapping this application (indicates the startup component to use)
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
