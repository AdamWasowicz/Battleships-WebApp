import axios, { AxiosError } from 'axios';

//Interfaces
import ISimulateBattleshipsOutputDTO from '../Simulation/assets/ISimulateBattleshipsOutputDTO';
import ISimulateBattleshipsInputDTO from '../Simulation/assets/ISimulateBattleshipsInputDTO';

//Api Endpoint
import { requestSimulationEndpoint } from '../../assets/constants/ApiEndpoints';

//Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsFetching, setIsDataRecived, setSimulationResults, setErrorMsg, resetBattleshipsState } from '../../redux/features/battleships-slice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


export const useHome = () => {

    //useHooks
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [maxTurns, setMaxTurns] = useState(0);

    const isFetching = useAppSelector(state => state.battleships.isFetching);
    const isDataRecived = useAppSelector(state => state.battleships.isDataRecived);
    const errorMsg = useAppSelector(state => state.battleships.errorMsg);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const requestSimulationApiCall = async (dto: ISimulateBattleshipsInputDTO) => {

        const url = process.env.REACT_APP_API_URL + requestSimulationEndpoint;
        let resultDTO: ISimulateBattleshipsOutputDTO;

        dispatch(setIsFetching(true));
        dispatch(setIsDataRecived(false));


        await axios({

            method: 'POST',
            url: url,
            data: dto
        })
        .then(result => {

            resultDTO = result.data;
            console.log(resultDTO);

            dispatch(setSimulationResults(resultDTO));
            dispatch(setIsDataRecived(true));
        })
        .catch((e: AxiosError) => {

            console.error(e.message);
            dispatch(setErrorMsg(e.message));
        })
        .finally(() => {

            dispatch(setIsFetching(false));
        });
    };
    

    const makeRequest = () => {

        const dto: ISimulateBattleshipsInputDTO = {
            player1Name: player1Name,
            player2Name: player2Name,
            maxTurns: maxTurns,
        }

        requestSimulationApiCall(dto);
    }


    //useEffect
    useEffect(() => {
        dispatch(resetBattleshipsState());
    }, [])

    useEffect(() => {
        if (isDataRecived == true)
            navigate('simulation');
    }, [isDataRecived])

    useEffect(() => {
        if (errorMsg != '')
            alert(errorMsg);
    }, [errorMsg])


    return {
         isFetching, isDataRecived, makeRequest,
         player1Name, setPlayer1Name, player2Name, setPlayer2Name, maxTurns, setMaxTurns
     }
}