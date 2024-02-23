import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactsComponent } from "./components/contact-list/contacts.component";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";

const routes: Routes = [
  { path: "contact-form", component: ContactFormComponent },
  { path: "", redirectTo: "/contact-form", pathMatch: "full" },
  { path: "contacts", component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
