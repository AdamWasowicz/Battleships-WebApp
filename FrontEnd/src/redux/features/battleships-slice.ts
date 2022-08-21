import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ISimulateBattleshipsOutputDTO from '../../pages/Simulation/assets/ISimulateBattleshipsOutputDTO';


interface BattleshipsState extends ISimulateBattleshipsOutputDTO {
    
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

            state.isFetching = false;
            state.isDataRecived =  false;
            state.currentTurn = 0;
            state.errorMsg = '';
            state.player1BoardState = [];
            state.player2BoardState = [];
            state.refreshDelay = 1000;
            state.isSimulationPause = false;

            state.endMsg = '';

            state.player1Name = '';
            state.player2Name = '';
            state.maxTurns = 0;
            state.turnsAtEnd = 0;

            state.player1Ships = null;
            state.player2Ships = null;

            state.player1ShotsMade = null;
            state.player2ShotsMade = null;
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

        updatePlayer1BoardState(state: BattleshipsState) {
            
            const newCoords = state.player1ShotsMade[state.player1BoardState.length].item1.x 
            + state.player1ShotsMade[state.player1BoardState.length].item1.y

            const boardCopy = state.player1BoardState;
            boardCopy.push(newCoords);

            state.player1BoardState = boardCopy;
        },

        updatePlayer2BoardState(state: BattleshipsState) {
            
            const newCoords = state.player2ShotsMade[state.player2BoardState.length].item1.x 
            + state.player2ShotsMade[state.player2BoardState.length].item1.y

            const boardCopy = state.player2BoardState;
            boardCopy.push(newCoords);

            state.player2BoardState = boardCopy;
        },

        setErrorMsg(state: BattleshipsState, action: PayloadAction<string>) {

            state.errorMsg = action.payload;
        },

        setRefreshDelay(state: BattleshipsState, action: PayloadAction<number>) {

            state.refreshDelay = action.payload;
        },

        setIsSimulationPause(state: BattleshipsState, action: PayloadAction<boolean>) {

            state.isSimulationPause = action.payload;
        }
    }
});

export const {
    setSimulationResults, incrementCurrentTurn, 
    updatePlayer1BoardState, updatePlayer2BoardState,
    setIsFetching, setIsDataRecived: setIsDataRecived,
    setErrorMsg, resetBattleshipsState, setRefreshDelay,
    setIsSimulationPause,
    
} = battleshipsSlice.actions;
    
export default battleshipsSlice.reducer;