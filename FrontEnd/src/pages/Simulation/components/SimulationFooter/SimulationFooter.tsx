import React from 'react';
import { useSimulationFooter } from './utils';

//Style
import './style.scss';


const SimulationFooter: React.FunctionComponent = () => {

    const { 
        currentTurn, maxTurn, refreshDelay,
        ReturnToRoot,IncreaseDelay, DecreaseDelay,
        PauseOrResume, isSimulationPause
     } = useSimulationFooter();


    return (
        <div className='SimulationFooter'>
            <div className='TurnContainer'>{`Turn: ${currentTurn} / ${maxTurn}`}</div>
            <button className='SimulationButton' onClick={ReturnToRoot}>Go to Home</button>
            <div className='SpeedControl'>
                <button onClick={DecreaseDelay}>-</button>
                <div title='How long before new turn' className='CurrentDelay'>{refreshDelay}</div>
                <button onClick={IncreaseDelay}>+</button>
            </div>
            
            <button className='SimulationButton' onClick={PauseOrResume}>
                {!isSimulationPause ? 'PAUSE' : 'RESUME'}
            </button>
        </div>
    );
}

export default SimulationFooter