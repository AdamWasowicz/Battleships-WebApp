import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

//Reducers
import battleshipsReducer from './features/battleships-slice';

enableMapSet();

//Store
export const store = configureStore({
    reducer: {
        battleships: battleshipsReducer,
    }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;