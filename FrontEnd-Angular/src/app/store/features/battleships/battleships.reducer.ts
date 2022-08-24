import { createReducer, on } from '@ngrx/store';
import ISimulateBattleshipsOutputDTO from '../../../simulation/assets/ISimulateBattleshipsOutputDTO';
import {
  SetSimulationResults, ResetBattleshipsState,
  IncrementCurrentTurn, SetIsFetching,
  SetIsDataRecived, UpdatePlayer1BoardState,
  UpdatePlayer2BoardState, SetErrorMsg,
  SetRefreshDelay, SetIsSimulationPause
 } from './battleships.actions';


export interface BattleshipsState extends ISimulateBattleshipsOutputDTO {

  isFetching: boolean;
  isDataRecived: boolean;
  currentTurn: number,
  errorMsg: string,

  player1BoardState: string[];
  player2BoardState: string[];
  refreshDelay: number;
  isSimulationPause: boolean;
}

const initialState: BattleshipsState = {

  isFetching: false,
  isDataRecived: false,
  currentTurn: 0,
  errorMsg: '',
  player1BoardState: [],
  player2BoardState: [],
  refreshDelay: 1000,
  isSimulationPause: false,

  //from EXTENDS
  endMsg: '',

  player1Name: '',
  player2Name: '',
  maxTurns: 0,
  turnsAtEnd: 0,

  player1Ships: null,
  player2Ships: null,

  player1ShotsMade: null,
  player2ShotsMade: null,
}


export const battleshipsReducer = createReducer(
  initialState,
  on(SetSimulationResults, (state: BattleshipsState, payload) => {
    return {
      ...state,
      ...payload
    }
  }),

  on(ResetBattleshipsState, (state: BattleshipsState) => {
    return {
      ...initialState
    }
  }),

  on(IncrementCurrentTurn, (state: BattleshipsState) => {
    return {
      ...state,
      currentTurn: state.currentTurn + 1
    }
  }),

  on(SetIsFetching, (state: BattleshipsState, action) => {
    return {
      ...state,
      isFetching: action.prop
    }
  }),

  on(SetIsDataRecived, (state: BattleshipsState, action) => {
    return {
      ...state,
      isDataRecived: action.prop
    }
  }),

  on(UpdatePlayer1BoardState, (state: BattleshipsState) => {

    const newCoords = state.player1ShotsMade[state.player1BoardState.length].item1.x
    + state.player1ShotsMade[state.player1BoardState.length].item1.y

    const boardCopy = state.player1BoardState;
    boardCopy.push(newCoords);

    return {
      ...state,
      player1BoardState: boardCopy
    }
  }),

  on(UpdatePlayer2BoardState, (state: BattleshipsState) => {
    const newCoords = state.player2ShotsMade[state.player2BoardState.length].item1.x
    + state.player2ShotsMade[state.player2BoardState.length].item1.y

    const boardCopy = state.player2BoardState;
    boardCopy.push(newCoords);

    return {
      ...state,
      player2BoardState: boardCopy
    }
  }),

  on(SetErrorMsg, (state: BattleshipsState, action) => {
    return {
      ...state,
      errorMsg: action.prop
    }
  }),

  on(SetRefreshDelay, (state: BattleshipsState, action) => {
    return {
      ...state,
      refreshDelay: action.prop
    }
  }),

  on(SetIsSimulationPause, (state: BattleshipsState, action) => {
    return {
      ...state,
      isSimulationPause: action.prop
    }
  })

);
