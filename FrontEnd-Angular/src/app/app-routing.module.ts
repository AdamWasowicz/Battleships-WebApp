import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', pathMatch:'full', component: HomeComponent},
  {path: 'simulation', loadChildren: () => import('./simulation/simulation.module').then(m => m.SimulationModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
