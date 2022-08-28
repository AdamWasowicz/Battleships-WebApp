import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationComponent } from './simulation.component';
import { SimulationHeaderComponent } from './components/simulationHeader/simulationHeader.component';
import { RouterModule } from '@angular/router';
import { PlayerBoardComponent } from './components/playerBoard/playerBoard.component';
import { NoDataError } from './components/noDataError/noDataError.component';

@NgModule({
  declarations: [
    SimulationComponent,
    SimulationHeaderComponent,
    PlayerBoardComponent,
    NoDataError
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SimulationComponent },
      { path: 'error', component: NoDataError}
    ]),
  ],
})

export class SimulationModule {};
