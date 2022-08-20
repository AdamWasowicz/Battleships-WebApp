import React from 'react';
import { useHome } from './utils';
import ISimulateBattleshipsInputDTO from '../Simulation/assets/ISimulateBattleshipsInputDTO';

//Style
import './style.scss';


const Home: React.FunctionComponent = () => {

    const { 
        makeRequest, player1Name, setPlayer1Name, 
        player2Name, setPlayer2Name, maxTurns, setMaxTurns, formValid, player1NameValid, 
        player2NameValid, maxTurnsValid 
    } = useHome();


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
                        { !player1NameValid && <div className='FormError'>Player1's Name must not be blank</div> }
                    </div>
                    

                    <div className='FormField'>
                        <label>Player2 Name:</label>
                        <input type='text' value={player2Name} onChange={(e) => { setPlayer2Name(e.target.value) }}/>
                        { !player2NameValid && <div className='FormError'>Player2's Name must not be blank</div> }
                    </div>
                    

                    <div className='FormField'>
                        <label>Max Turns:</label>
                        <input type='number' value={maxTurns} onChange={(e) => { setMaxTurns(+e.target.value) }}/>
                        { !maxTurnsValid && <div className='FormError'>Max turns must be 1 or higher</div> }
                    </div>
                    

                    <div className='SubmitButtonSontainer'>
                        <button disabled={!formValid} className={`FormSubmitButton ${!formValid ? 'Disabled' : ''}`} type='submit'>Simulate</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;