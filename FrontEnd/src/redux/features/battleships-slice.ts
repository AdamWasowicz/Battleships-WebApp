import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import GridCoordinates from '../../pages/Simulation/assets/GridCoordinates';
import ISimulateBattleshipsOutputDTO from '../../pages/Simulation/assets/ISimulateBattleshipsOutputDTO';


interface BattleshipsState extends ISimulateBattleshipsOutputDTO {
    
    isFetching: boolean;
    isDataRecived: boolean;
    currentTurn: number,
    errorMsg: string,

    //player1BoardState: Map<string, GridCoordinates>
    //player2BoardState: Map<string, GridCoordinates>
}


const initialState: BattleshipsState = {

    isFetching: false,
    isDataRecived: false,
    currentTurn: 0,
    errorMsg: '',
    //player1BoardState: new Map<string, GridCoordinates>(),
    //player2BoardState: new Map<string, GridCoordinates>(),

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


const battleshipsSlice = createSlice({
    name: 'battleships',
    initialState,
    reducers: {
        setSimulationResults(
            state: BattleshipsState, 
            action: PayloadAction<ISimulateBattleshipsOutputDTO>) {

            //I know that it looks ugly but it's the only way
            state.endMsg= action.payload.endMsg;
            state.player1Name = action.payload.player1Name;
            state.player2Name = action.payload.player2Name;
            state.maxTurns = action.payload.maxTurns;
            state.turnsAtEnd = action.payload.turnsAtEnd;
            state.player1Ships = action.payload.player1Ships;
            state.player2Ships = action.payload.player2Ships;
            state.player1ShotsMade = action.payload.player1ShotsMade;
            state.player2ShotsMade = action.payload.player2ShotsMade;
        },

        incrementCurrentTurn(state: BattleshipsState) {

            state.currentTurn = state.currentTurn + 1;
        },

        setIsFetching(state: BattleshipsState, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
            
        },

        setIsDataRecived(state: BattleshipsState, action: PayloadAction<boolean>) {
            state.isDataRecived = action.payload;
        },

        // updatePlayer1BoardState(
        //     state: BattleshipsState, 
        //     action: PayloadAction<GridCoordinates>) {
            
        //     let newBoardState = state.player1BoardState.set(
        //         action.payload.returnCoordinatesAsString(),
        //         action.payload)
        //     state = {
        //         ...state,
        //         player1BoardState: newBoardState
        //     }
        // },

        // updatePlayer2BoardState(
        //     state: BattleshipsState, 
        //     action: PayloadAction<GridCoordinates>) {
            
        //     let newBoardState = state.player2BoardState.set(
        //         action.payload.returnCoordinatesAsString(),
        //         action.payload)
        //     state = {
        //         ...state,
        //         player2BoardState: newBoardState
        //     }
        // },

        setErrorMsg(
            state: BattleshipsState,
            action: PayloadAction<string>) {

            state.errorMsg = action.payload;
        },


    }
});

export const {
    setSimulationResults, incrementCurrentTurn, 
    //updatePlayer1BoardState, updatePlayer2BoardState,
    setIsFetching, setIsDataRecived: setIsDataRecived,
    setErrorMsg } = battleshipsSlice.actions;
    
export default battleshipsSlice.reducer;