import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { AppState } from "../../../store/app.reducer";
import { Subscription} from 'rxjs';
import { BattleshipsState } from "../../../store/features/battleships/battleships.reducer";
import IShip from "../../assets/IShip";


@Component({
  selector: 'app-playerBoard',
  templateUrl: './playerBoard.component.html',
  styleUrls: ['./playerBoard.component.scss']
})
export class PlayerBoardComponent implements OnInit, OnDestroy {

  @Input() playerId: number;

  //State
  playerShips: IShip[] = [];
  playerBoardState: string[] = [];
  storeSubscription: Subscription = null;

  //Variables
  eleven: number[] = [0,1,2,3,4,5,6,7,8,9,10];
  shipsMap: Map<string, IShip> = null;
  shotsMap: Map<string, boolean> = null;

  constructor(private store: Store<AppState>) {}


  CreatePlayerShipsMap = (playerShips: IShip[]): Map<string, IShip> => {

    let shipsMap = new Map<string, IShip>();

    playerShips.forEach((ship: IShip) => {
        ship.gridCoordinates.forEach((gc) => {
            shipsMap.set(gc.x + gc.y, ship);
        })
    });

    return shipsMap;
  }

  CreateShotsMap = (shotsCoordiantes: string[]): Map<string, boolean> => {

    let shotsMap = new Map<string, boolean>();

    shotsCoordiantes.forEach((gc: string) => {
        shotsMap.set(gc, true);
    });

    return shotsMap;
  }

  ReturnShipMapCoordinates = (I: number, D: number): IShip => {

    return this.shipsMap.get(
      String.fromCharCode(I + +'A'.charCodeAt(0) - 1) + D.toLocaleString()
    )
  }

  ReturnShotsMapCoordinates = (I: number, D: number): boolean => {

    return this.shotsMap.get(
      String.fromCharCode(I + +'A'.charCodeAt(0) - 1) + D.toLocaleString()
    )
  }


  ngOnInit(): void {
    //Store
    this.storeSubscription = this.store.select('battleships').subscribe(

      (state: BattleshipsState) => {
        this.playerShips = this.playerId == 0
        ? state.player1Ships
        : state.player2Ships;

        this.playerBoardState = this.playerId == 0
        ? state.player1BoardState
        : state.player2BoardState;

        //CreateMaps
        this.shipsMap = this.CreatePlayerShipsMap(this.playerShips);
        this.shotsMap = this.CreateShotsMap(this.playerBoardState);
      }
    )
  }

  ngOnDestroy(): void {
    //Store
    this.storeSubscription.unsubscribe();
  }
}
