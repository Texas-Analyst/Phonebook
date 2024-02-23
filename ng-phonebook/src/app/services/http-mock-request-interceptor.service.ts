import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Contact } from "../components/contact-list/contact";
import contacts from "../data.json";

const urls = [
  {
    url: "http://localhost:8080/api/contact",
    method: "GET",
    getData: (request: HttpRequest<Contact>, id: number) => {
      console.log(request, id);
      return contacts;
    },
  },
  {
    url: "http://localhost:8080/api/contact",
    method: "POST",
    getData: (request: HttpRequest<Contact>, id: number) => {
      if (request && request.body && request.body.id > 0) {
        request.body.id = contacts.contacts.length + 1;
      }
      //    data.push(request.body)
      return request.body;
    },
  },
  {
    url: "http://localhost:8080/api/contact/#",
    method: "GET",
    getData: (request: HttpRequest<Contact>, id: number) => {
      return contacts.contacts.filter(
        (item) => item.id.toString() === id.toString()
      )[0];
    },
  },
  {
    url: "http://localhost:8080/api/contact/#",
    method: "PUT",
    getData: (request: HttpRequest<Contact>, id: number) => {
      let foundItem = contacts.contacts.filter(
        (item) => item.id.toString() === id.toString()
      )[0];
      Object.assign(foundItem, request.body);

      return foundItem;
    },
  },
];

@Injectable({ providedIn: "root" })
// @ts-ignore
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<Contact>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    for (const element of urls) {
      if (request.method == element.method) {
        if (request.url === element.url) {
          return of(
            new HttpResponse({
              status: 200,
              body: element.getData(request, 0),
            })
          );
        } else {
          let url = new URL(request.url);
          let id = url.pathname.replace("/api/contact/", "");
          if (id && url.origin + "/api/contact/#" === element.url) {
            return of(
              new HttpResponse({
                status: 200,
                body: element.getData(request, Number(id)),
              })
            );
          }
        }
      }

      console.log("Unable to find the path", request.url, request.method);
    }

    return next.handle(request);
  }
}
