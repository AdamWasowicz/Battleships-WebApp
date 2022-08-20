import React from 'react';
import { useAppSelector } from '../../../redux/hooks';

//Style
import './style.scss';


const SimulationHeader: React.FunctionComponent = () => {

    const player1Name = useAppSelector(state => state.battleships.player1Name);
    const player2Name = useAppSelector(state => state.battleships.player2Name);

    return (
        <div className='SimulationHeader'>
            <h1>{player1Name}</h1>
            <h2>VS</h2>
            <h1>{player2Name}</h1>
        </div>
    )
}

export default SimulationHeader;