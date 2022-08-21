import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setRefreshDelay, setIsSimulationPause } from "../../../../redux/features/battleships-slice";



export const useSimulationFooter = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    
    const FormatCurrentTurn = () => {
        
        const maxTurnStringLength = maxTurn.toLocaleString().length;
        const currentTurnRawStringLength = currentTurnRaw.toLocaleString().length;
        
        let returnValue: string = '';
        for (let i = 0; i < (maxTurnStringLength - currentTurnRawStringLength); i++) {
            
            returnValue += '0';
        }
        
        returnValue += currentTurnRaw.toLocaleString();
        
        return returnValue;
    }
    
    const ReturnToRoot = () => {
        
        navigate('/');
    }

    const IncreaseDelay = () => {
        if (refreshDelay + interval <= maxDelay)
        dispatch(setRefreshDelay(refreshDelay + interval));
    }

    const DecreaseDelay = () => {
        if (refreshDelay - interval >= minDelay)
        dispatch(setRefreshDelay(refreshDelay - interval));
    }

    const PauseOrResume = () => {

        dispatch(setIsSimulationPause(!isSimulationPause));
    }
    

    const refreshDelay = useAppSelector(state => state.battleships.refreshDelay);
    const interval = 100;
    const minDelay = 200;
    const maxDelay = 2000;
    const currentTurnRaw = useAppSelector(state => state.battleships.currentTurn);
    const maxTurn = useAppSelector(state => state.battleships.maxTurns);
    const currentTurn = FormatCurrentTurn();
    const isSimulationPause = useAppSelector(state => state.battleships.isSimulationPause);


    return { 
        currentTurn, maxTurn, refreshDelay,
        ReturnToRoot, IncreaseDelay, DecreaseDelay, 
        PauseOrResume, isSimulationPause
    }
}