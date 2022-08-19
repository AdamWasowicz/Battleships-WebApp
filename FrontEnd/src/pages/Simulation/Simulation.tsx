import React from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../redux/hooks';

//Components
import PlayerBoard from './PlayerBoard';

//Style
import './style.scss';


const Simulation: React.FunctionComponent = () => {

    const navigate = useNavigate();
    const isDataRecived = useAppSelector(state => state.battleships.isDataRecived);

    const goBackToRoot = () => {
        navigate('/');
    }

    if (isDataRecived == false){
        return (
            <div>
                There is no data for simulation, return to the home page to request simulation
                <button onClick={goBackToRoot}>Go back</button>
            </div>
        )
    }

    return (
        <div className='Simulation'>
            <div className='PlayerBoardContainer'>
                <PlayerBoard playerId={0}/>
                <PlayerBoard playerId={1}/>
            </div>
        </div>
    );
}

export default Simulation;