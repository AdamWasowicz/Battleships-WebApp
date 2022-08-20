import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISimulateBattleshipsOutputDTO from '../../pages/Simulation/assets/ISimulateBattleshipsOutputDTO';


interface BattleshipsState extends ISimulateBattleshipsOutputDTO {
    
    isFetching: boolean;
    isDataRecived: boolean;
    currentTurn: number,
    errorMsg: string,

    player1BoardState: string[];
    player2BoardState: string[];
}


const initialState: BattleshipsState = {

    isFetching: false,
    isDataRecived: false,
    currentTurn: 0,
    errorMsg: '',
    player1BoardState: [],
    player2BoardState: [],

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

        resetBattleshipsState(state: BattleshipsState) {

            state = initialState;
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

        updatePlayer1BoardState(
            state: BattleshipsState, 
            action: PayloadAction) {
            
                const newCoords = state.player1ShotsMade[state.player1BoardState.length].item1.x 
                + state.player1ShotsMade[state.player1BoardState.length].item1.y

                const boardCopy = state.player1BoardState;
                boardCopy.push(newCoords);

                state.player1BoardState = boardCopy;
        },

        updatePlayer2BoardState(
            state: BattleshipsState, 
            action: PayloadAction) {
            
                const newCoords = state.player2ShotsMade[state.player2BoardState.length].item1.x 
                + state.player2ShotsMade[state.player2BoardState.length].item1.y

                const boardCopy = state.player2BoardState;
                boardCopy.push(newCoords);

                state.player2BoardState = boardCopy;
        },

        setErrorMsg(
            state: BattleshipsState,
            action: PayloadAction<string>) {

            state.errorMsg = action.payload;
        },


    }
});

export const {
    setSimulationResults, incrementCurrentTurn, 
    updatePlayer1BoardState, updatePlayer2BoardState,
    setIsFetching, setIsDataRecived: setIsDataRecived,
    setErrorMsg, resetBattleshipsState 
    
} = battleshipsSlice.actions;
    
export default battleshipsSlice.reducer;