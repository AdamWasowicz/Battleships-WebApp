import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationComponent } from './simulation.component';
import { SimulationHeaderComponent } from './components/simulationHeader/simulationHeader.component';
import { RouterModule } from '@angular/router';
import { PlayerBoardComponent } from './components/playerBoard/playerBoard.component';
import { NoDataErrorComponent } from './components/noDataError/noDataError.component';
import { GridComponent } from './components/grid/grid.component';
import { SimulationFooterComponent } from './components/simulationFooter/simulationFooter.component';


@NgModule({
  declarations: [
    SimulationComponent,
    SimulationHeaderComponent,
    PlayerBoardComponent,
    NoDataErrorComponent,
    GridComponent,
    SimulationFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SimulationComponent },
      { path: 'error', component: NoDataErrorComponent}
    ]),
  ],
})

export class SimulationModule {};
