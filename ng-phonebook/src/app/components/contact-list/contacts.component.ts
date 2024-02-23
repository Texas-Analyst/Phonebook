import { Component, OnInit } from "@angular/core";
import { ContactService } from "../../services/contacts.service";
import { Contact } from "./contact";
// import {updatePlaceholderMap} from "@angular/compiler/src/render3/view/i18n/util";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.css"],
  providers: [ContactService],
})
export class ContactsComponent implements OnInit {
  public contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // this.readAll();
  }

  private readAll() {
    return this.contactService.loadAll().subscribe((list) => {
      this.contacts = list;
    });
  }
}
