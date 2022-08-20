import React from 'react';

//Components
import PlayerBoard from './PlayerBoard';
import SimulationHeader from './SimulationHeader';

//Style
import './style.scss';
import { useSimulation } from './utils';


const Simulation: React.FunctionComponent = () => {

    const { isDataRecived, goBackToRoot } = useSimulation();

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
            <SimulationHeader/>

            <div className='PlayerBoardContainer'>
                <PlayerBoard playerId={0}/>
                <PlayerBoard playerId={1}/>
            </div>
        </div>
    );
}

export default Simulation;