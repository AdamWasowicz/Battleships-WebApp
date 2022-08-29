import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from "../store/app.reducer";
import { Subscription} from 'rxjs';
import { BattleshipsState } from "../store/features/battleships/battleships.reducer";
import { IncrementCurrentTurn, UpdatePlayer1BoardState, UpdatePlayer2BoardState } from "../store/features/battleships/battleships.actions";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit, OnDestroy {

  //State
  isDataRecived = false;
  currentTurn = 0;
  maxTurn = 0;
  endMsg = '';
  refreshDelay = 1000;
  isSimulationPause = false;
  storeSubscription: Subscription;
  gameProgressSubscription: ReturnType<typeof setTimeout> = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute) {}


  progressGame = () => {

    if (this.isSimulationPause)
            return;

    if (this.currentTurn % 2 == 0)
      this.store.dispatch(UpdatePlayer1BoardState());
    else
      this.store.dispatch(UpdatePlayer2BoardState());

    if (this.currentTurn < this.maxTurn)
      this.store.dispatch(IncrementCurrentTurn());

    if (this.currentTurn < this.maxTurn)
      this.gameProgressSubscription = setTimeout(this.progressGame, this.refreshDelay)
  }


  ngOnInit(): void {

    //Store
    this.storeSubscription = this.store.select('battleships').subscribe(

      (state: BattleshipsState) => {

        this.isDataRecived = state.isDataRecived;
        this.currentTurn = state.currentTurn;
        this.maxTurn = state.maxTurns;
        this.endMsg = state.endMsg;
        this.refreshDelay = state.refreshDelay;
        this.isSimulationPause = state.isSimulationPause;

        //When game is over
        if (this.currentTurn == this.maxTurn && this.isDataRecived)
          alert(`Game finished\n${this.endMsg}`)
      }
    )

    //Redirect if no data
    if (!this.isDataRecived) {
      this.router.navigate(['error'], {relativeTo: this.route})
      return;
    }

    //GameProgress
    if (this.currentTurn < this.maxTurn)
      this.gameProgressSubscription = setTimeout(this.progressGame, this.refreshDelay);
  }

  ngOnDestroy(): void {
    //Store
    this.storeSubscription.unsubscribe();

    //GameProgress
    clearTimeout(this.gameProgressSubscription);
  }

}
