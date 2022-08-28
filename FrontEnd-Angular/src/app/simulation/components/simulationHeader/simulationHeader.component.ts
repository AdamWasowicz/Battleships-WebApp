import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from "../../../store/app.reducer";
import { Subscription} from 'rxjs';
import { BattleshipsState } from "../../../store/features/battleships/battleships.reducer";


@Component({
  selector: 'app-simulationHeader',
  templateUrl: './simulationHeader.component.html',
  styleUrls: ['./simulationHeader.component.scss']
})
export class SimulationHeaderComponent implements OnInit, OnDestroy {

  //State
  player1Name: string = '';
  player2Name: string = '';
  storeSubscription: Subscription = null;

  constructor(private store: Store<AppState>) {}


  ngOnInit(): void {

    //Store
    this.storeSubscription = this.store.select('battleships').subscribe(

      (state: BattleshipsState) => {
        this.player1Name = state.player1Name;
        this.player2Name = state.player2Name;
      }
    )

  }

  ngOnDestroy(): void {
    //Store
    this.storeSubscription.unsubscribe;
  }
}
