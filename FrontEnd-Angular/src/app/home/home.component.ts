import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from "../store/app.reducer";
import { Subscription} from 'rxjs';
import ISimulateBattleshipsInputDTO from "../simulation/assets/ISimulateBattleshipsInputDTO";
import { requestSimulationEndpoint } from "src/assets/constants/ApiEndpoints";
import { environment } from "src/environments/environment";
import { BattleshipsState } from "../store/features/battleships/battleships.reducer";
import ISimulateBattleshipsOutputDTO from "../simulation/assets/ISimulateBattleshipsOutputDTO";
import { ResetBattleshipsState, SetErrorMsg, SetIsDataRecived, SetIsFetching, SetSimulationResults } from "../store/features/battleships/battleships.actions";
import axios, { AxiosError } from 'axios';
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  //State
  player1Name: string = '';
  player1NameValid: boolean = this.player1Name.length > 0;
  player2Name: string = '';
  player2NameValid: boolean = this.player2Name.length > 0;
  maxTurns: number = 150;
  maxTurnsValid: boolean = this.maxTurns > 0;
  formValid: boolean = this.player1Name.length > 0 && this.player2Name.length > 0 && this.maxTurns > 0;

  //State
  isFetching: boolean = false;
  isDataRecived: boolean = false;
  subscription: Subscription;


  constructor(
    private store: Store<AppState>,
    private router: Router){}


  //OnInit
  ngOnInit(): void {

    //Get data from store
    this.subscription = this.store.select('battleships').subscribe(

      (state: BattleshipsState) => {

        this.isFetching = state.isFetching;
        this.isDataRecived = state.isDataRecived;
      }
    )

    //Reset store on enter
    this.store.dispatch(ResetBattleshipsState());
  }

  //OnDestroy
  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }


  requestSimulationApiCall = async (dto: ISimulateBattleshipsInputDTO) => {

    const url = environment.API_URL + requestSimulationEndpoint;

    let resultDTO: ISimulateBattleshipsOutputDTO;
    this.store.dispatch(SetIsFetching({prop: true}));
    this.store.dispatch(SetIsDataRecived({prop: false}));

    await axios({

      method: 'POST',
      url: url,
      data: dto
    })
    .then(result => {

      resultDTO = result.data;

      this.store.dispatch(SetSimulationResults(resultDTO));
      this.store.dispatch(SetIsDataRecived({prop: true}));

      if (result.status == 200)
        this.router.navigate(['simulation']);
    })
    .catch((e: AxiosError) => {

      if (e.response == null) {

        this.store.dispatch(SetErrorMsg({prop: `ERROR: Unknown Error`}));
        alert('There is something wrong, try again later');
      }
      else
        this.store.dispatch(SetErrorMsg({prop: `ERROR: ${e.response.data}`}));

    })
    .finally(() => {

      this.store.dispatch(SetIsFetching({prop: false}));
    });

  }

  makeRequest = () => {

    const dto: ISimulateBattleshipsInputDTO = {
      player1Name: this.player1Name,
      player2Name: this.player2Name,
      maxTurns: this.maxTurns,
    }

    this.requestSimulationApiCall(dto);
  }

  onFormChange = () => {

    this.player1NameValid = this.player1Name.length > 0;
    this.player2NameValid = this.player2Name.length > 0;
    this.maxTurnsValid = this.maxTurns > 0;
    this.formValid = this.player1Name.length > 0 && this.player2Name.length > 0 && this.maxTurns > 0
  }

}
