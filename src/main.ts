import { Component } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { RouterModule } from "@angular/router";
import { bootstrapApplication } from "@angular/platform-browser";
import { NavigationComponent } from './app/components/navigation/navigation.component';



@Component({
  selector: "app-root",
  imports: [NavigationComponent, RouterModule],
  template: `
    <app-navigation></app-navigation>
    <router-outlet></router-outlet>
  `,
})
export class App {}

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});
