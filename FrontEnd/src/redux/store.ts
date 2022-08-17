import { configureStore } from '@reduxjs/toolkit';

//Reducers
import counterReducer from './features/counter-slice';


//Store
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;