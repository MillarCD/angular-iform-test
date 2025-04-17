import { Routes } from "@angular/router";
import { FormPageComponent } from "./pages/form-page/form-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { BaseLayoutComponent } from "./layouts/base-layout/base-layout.component";
import { AdministrationPageComponent } from "./pages/administration-page/administration-page.component";

const viewsRoutes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'form',
        component: FormPageComponent
      },
      {
        path: 'admin',
        component: AdministrationPageComponent,
      },
      {
        path: '**',
        redirectTo: 'form'
      }
    ]
  }
];

export default viewsRoutes;
