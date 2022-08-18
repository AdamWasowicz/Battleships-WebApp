import React from 'react';
import { useHome } from './utils';
import ISimulateBattleshipsInputDTO from '../Simulation/assets/ISimulateBattleshipsInputDTO';

//Style
import './style.scss';


const Home: React.FunctionComponent = () => {

    const { isFetching, isDataRecived, makeRequest } = useHome();

    return (
        <div className='Home'>
            <div className='FormContainer'>
                <button onClick={makeRequest}>
                    Test
                </button>
            </div>
        </div>
    );
};

export default Home;