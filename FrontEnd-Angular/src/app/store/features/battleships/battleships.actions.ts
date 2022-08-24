import { createAction, props } from '@ngrx/store';
import ISimulateBattleshipsOutputDTO from 'src/app/simulation/assets/ISimulateBattleshipsOutputDTO';


export enum battleshipsActions {

  SetSimulationResults = '[Battleships SetSimulationResults]',
  ResetBattleshipsState = '[Battleships ResetBattleshipsState]',
  IncrementCurrentTurn = '[Battleships IncrementCurrentTurn]',
  SetIsFetching = '[Battleships SetIsFetching]',
  SetIsDataRecived = '[Battleships SetIsDataRecived]',
  UpdatePlayer1BoardState = '[Battleships UpdatePlayer1BoardState]',
  UpdatePlayer2BoardState = '[Battleships UpdatePlayer2BoardState]',
  SetErrorMsg = '[Battleships SetErrorMsg]',
  SetRefreshDelay = '[Battleships SetRefreshDelay]',
  SetIsSimulationPause = '[Battleships SetIsSimulationPause]'
}

export const SetSimulationResults = createAction(battleshipsActions.SetSimulationResults,
  props<ISimulateBattleshipsOutputDTO>());

export const ResetBattleshipsState = createAction(battleshipsActions.ResetBattleshipsState);

export const IncrementCurrentTurn = createAction(battleshipsActions.IncrementCurrentTurn);

export const SetIsFetching = createAction(battleshipsActions.SetIsFetching,
  props<{prop: boolean}>());

export const SetIsDataRecived = createAction(battleshipsActions.SetIsDataRecived,
  props<{prop: boolean}>());

export const UpdatePlayer1BoardState = createAction(battleshipsActions.UpdatePlayer1BoardState);

export const UpdatePlayer2BoardState = createAction(battleshipsActions.UpdatePlayer2BoardState);

export const SetErrorMsg = createAction(battleshipsActions.SetErrorMsg,
  props<{prop: string}>());

export const SetRefreshDelay = createAction(battleshipsActions.SetRefreshDelay,
  props<{prop: number}>());

export const SetIsSimulationPause = createAction(battleshipsActions.SetIsSimulationPause,
  props<{prop: boolean}>());

