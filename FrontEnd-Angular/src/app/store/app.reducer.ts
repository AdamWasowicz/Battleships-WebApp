import { ActionReducerMap } from "@ngrx/store";
import { battleshipsReducer, BattleshipsState } from './features/battleships/battleships.reducer';


export interface AppState {
  battleships: BattleshipsState
}

export const appReducer: ActionReducerMap<AppState> = {
  battleships: battleshipsReducer
}
