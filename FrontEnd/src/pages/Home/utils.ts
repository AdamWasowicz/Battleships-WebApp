import axios, { AxiosError } from 'axios';

//Interfaces
import ISimulateBattleshipsOutputDTO from '../Simulation/assets/ISimulateBattleshipsOutputDTO';
import ISimulateBattleshipsInputDTO from '../Simulation/assets/ISimulateBattleshipsInputDTO';

//Api Endpoint
import { requestSimulationEndpoint } from '../../assets/constants/ApiEndpoints';

//Redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsFetching, setIsDataRecived, setSimulationResults, setErrorMsg, resetBattleshipsState} from '../../redux/features/battleships-slice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


export const useHome = () => {

    //useHooks
    const [player1Name, setPlayer1Name] = useState('');
    const [player1NameValid, setPlayer1NameValid] = useState(false);

    const [player2Name, setPlayer2Name] = useState('');
    const [player2NameValid, setPlayer2NameValid] = useState(false);

    const [maxTurns, setMaxTurns] = useState(150);
    const [maxTurnsValid, setMaxTurnsValid] = useState(true);
    const [formValid, setFormValid] = useState(false);


    const isFetching = useAppSelector(state => state.battleships.isFetching);
    const isDataRecived = useAppSelector(state => state.battleships.isDataRecived);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const requestSimulationApiCall = async (dto: ISimulateBattleshipsInputDTO) => {

        const url = process.env.REACT_APP_API_URL + requestSimulationEndpoint;
        console.log(url);
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

            dispatch(setSimulationResults(resultDTO));
            dispatch(setIsDataRecived(true));

            if (result.status == 200)
                navigate('simulation');
        })
        .catch((e: AxiosError) => {

            if (e.response == null) {

                dispatch(setErrorMsg(`ERROR: Unknown Error`));
                alert('There is something wrong, try again later');
            }
            else {

                dispatch(setErrorMsg(`ERROR: ${e.response.data}`));
            }
            
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
        //Validation
        setPlayer1NameValid(player1Name.length > 0);
        setPlayer2NameValid(player2Name.length > 0);
        setMaxTurnsValid(maxTurns > 0);

        setFormValid(player1Name.length > 0 && player2Name.length > 0 && maxTurns > 0);

    }, [player1Name, player2Name, maxTurns])

    useEffect(() => {
        dispatch(resetBattleshipsState());
        
    }, []);


    return {
         isFetching, isDataRecived, makeRequest,
         player1Name, setPlayer1Name, player2Name, setPlayer2Name, 
         maxTurns, setMaxTurns, 
         formValid, player1NameValid, player2NameValid, maxTurnsValid
     }
}