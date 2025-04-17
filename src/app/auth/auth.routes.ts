import { Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  }
];

export default authRoutes;
