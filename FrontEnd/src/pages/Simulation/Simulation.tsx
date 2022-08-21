import React from 'react';
import InformationWithButton from '../../components/InformationWithButton';

//Components
import PlayerBoard from './components/PlayerBoard';
import SimulationFooter from './components/SimulationFooter';
import SimulationHeader from './components/SimulationHeader';

//Style
import './style.scss';
import { useSimulation } from './utils';


const Simulation: React.FunctionComponent = () => {

    const { isDataRecived, goBackToRoot } = useSimulation();

    if (isDataRecived == false){
        return (
            <InformationWithButton 
                onClick={goBackToRoot}
                text='There is no data for simulation, return to home page'
                buttonText='Return to Home' 
            />
        )
    }

    return (
        <div className='Simulation'>
            <SimulationHeader/>

            <div className='PlayerBoardContainer'>
                <PlayerBoard playerId={0}/>
                <PlayerBoard playerId={1}/>
            </div>

            <SimulationFooter/>
        </div>
    );
}

export default Simulation;