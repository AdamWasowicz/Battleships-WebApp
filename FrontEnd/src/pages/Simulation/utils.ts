import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { updatePlayer1BoardState, updatePlayer2BoardState, incrementCurrentTurn } from "../../redux/features/battleships-slice";
import { useEffect } from "react";


export const useSimulation = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isDataRecived = useAppSelector(state => state.battleships.isDataRecived);
    const currentTurn = useAppSelector(state => state.battleships.currentTurn);
    const maxTurn = useAppSelector(state => state.battleships.maxTurns);
    const endMsg = useAppSelector(state => state.battleships.endMsg);
    const refreshDelay = useAppSelector(state => state.battleships.refreshDelay);
    const isSimulationPause = useAppSelector(state => state.battleships.isSimulationPause);


    const progressGame = () => {

        if (isSimulationPause)
            return;

        if (currentTurn % 2 == 0) 
            dispatch(updatePlayer1BoardState()); 
        else 
            dispatch(updatePlayer2BoardState());
        
        if (currentTurn < maxTurn) 
            dispatch(incrementCurrentTurn());
    }

    useEffect(() => {
        let gameControl: ReturnType<typeof setTimeout>;

        if (currentTurn < maxTurn)
            gameControl = setTimeout(progressGame, refreshDelay);

        return () => clearTimeout(gameControl);
    })

    useEffect(() => {
        if (currentTurn >= maxTurn && isDataRecived)
            alert(`Game finished\n${endMsg}`);
    }, [currentTurn])

    const goBackToRoot = () => {
        navigate('/');
    }


    return { isDataRecived, goBackToRoot }
}