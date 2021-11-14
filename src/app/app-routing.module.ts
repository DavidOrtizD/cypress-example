import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { SimpleElementsComponent } from './pages/simple-elements/simple-elements.component';
import { FormsComponent } from './pages/forms/forms.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainPageComponent    
  },
  {
    path: 'simple-elements',
    component: SimpleElementsComponent
  },
  {
    path: 'quiz',
    component: FormsComponent
  },
  {
    path: '**',
    redirectTo: '/main',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
