import axios, { AxiosError } from 'axios';

//Interfaces
import ISimulateBattleshipsOutputDTO from '../Simulation/assets/ISimulateBattleshipsOutputDTO';
import ISimulateBattleshipsInputDTO from '../Simulation/assets/ISimulateBattleshipsInputDTO';

//Api Endpoint
import { requestSimulationEndpoint } from '../../assets/constants/ApiEndpoints';

//Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsFetching, setIsDataRecived, setSimulationResults, setErrorMsg } from '../../redux/features/battleships-slice';


export const useHome = () => {

    const isFetching = useAppSelector(state => state.battleships.isFetching);
    const isDataRecived = useAppSelector(state => state.battleships.isDataRecived);
    const dispatch = useAppDispatch();


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
        })
        .catch((e: AxiosError) => {

            console.error(e.message);
            dispatch(setErrorMsg(e.message));
        })
        .finally(() => {

            dispatch(setIsFetching(false));
            dispatch(setIsDataRecived(true));
        });
    };
    

    const makeRequest = () => {

        const test: ISimulateBattleshipsInputDTO = {
            player1Name: 'Adam',
            player2Name: 'Bob',
            maxTurns: 150,
        }

        requestSimulationApiCall(test);
    }


    return { isFetching, isDataRecived, makeRequest }
}