import React from 'react';
import { useHome } from './utils';
import ISimulateBattleshipsInputDTO from '../Simulation/assets/ISimulateBattleshipsInputDTO';

//Style
import './style.scss';


const Home: React.FunctionComponent = () => {

    const { isFetching, isDataRecived, makeRequest, player1Name, setPlayer1Name, player2Name, setPlayer2Name, maxTurns, setMaxTurns } = useHome();

    return (
        <div className='Home'>
            <div className='FormContainer'>
                <div className='FormTitle'>
                    <p>Battle</p>
                    <p>ships</p>
                </div>

                <form onSubmit={(e) => {e.preventDefault(); makeRequest();}}>
                    <div className='FormField'>
                        <label>Player1 Name:</label>
                        <input type='text' value={player1Name} onChange={(e) => {setPlayer1Name(e.target.value)}}/>
                    </div>

                    <div className='FormField'>
                        <label>Player2 Name:</label>
                        <input type='text' value={player2Name} onChange={(e) => { setPlayer2Name(e.target.value) }}/>
                    </div>

                    <div className='FormField'>
                        <label>Max Turns:</label>
                        <input type='number' value={maxTurns} onChange={(e) => { setMaxTurns(+e.target.value) }}/>
                    </div>

                    <div className='SubmitButtonSontainer'>
                        <button className='FormSubmitButton' type='submit'>Simulate</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;