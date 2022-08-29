import { Component} from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "../../../store/app.reducer";
import { BattleshipsState } from "../../../store/features/battleships/battleships.reducer";
import { SetRefreshDelay, SetIsSimulationPause } from "../../../store/features/battleships/battleships.actions";


@Component({
  selector: 'app-simulationFooter',
  templateUrl: './simulationFooter.component.html',
  styleUrls: ['./simulationFooter.component.scss']
})
export class SimulationFooterComponent {

  public GoBackToRoot = () => this.router.navigate(['/']);
  public DecreaseDelay = (): void => {
    if (this.refreshDelay - this.interval >= this.minDelay)
      this.store.dispatch(SetRefreshDelay({prop: this.refreshDelay - this.interval}));
  }
  public IncreaseDelay = (): void => {
    if (this.refreshDelay + this.interval <= this.maxDelay)
      this.store.dispatch(SetRefreshDelay({prop: this.refreshDelay + this.interval}));
  }
  public FormatCurrentTurn = (): string => {

    const maxTurnStringLength = this.maxTurn.toLocaleString().length;
    const currentTurnRawStringLength = this.currentTurnRaw.toLocaleString().length;

    let returnValue: string = '';
    for (let i = 0; i < (maxTurnStringLength - currentTurnRawStringLength); i++)
      returnValue += '0';

    returnValue += this.currentTurnRaw.toLocaleString();

    return returnValue;
  }
  public PauseOrResume = (): void => this.store.dispatch(SetIsSimulationPause({prop: !this.isSimulationPause}));



  //Const
  interval: number = 100;
  minDelay: number = 200;
  maxDelay: number = 2000;

  //State
  currentTurnRaw: number = 0;
  maxTurn: number = 0;
  refreshDelay: number = 0;
  isSimulationPause: boolean = false;
  storeSubscription: Subscription = null;


  ngOnDestory(): void {
    //Store
    this.storeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    //Store
    this.storeSubscription = this.store.select('battleships').subscribe(

      (state: BattleshipsState) => {
        this.currentTurnRaw = state.currentTurn;
        this.maxTurn = state.maxTurns;
        this.refreshDelay = state.refreshDelay;
        this.isSimulationPause = state.isSimulationPause;
      }
    )
  }

  constructor(
    private router: Router,
    private store: Store<AppState>) {}
}
