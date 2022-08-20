import React from 'react';
import { useNavigate } from 'react-router';

//Style
import './style.scss';


const Error404: React.FunctionComponent = () => {

    const navigation = useNavigate();
    const redirectToRoot = () => {
        navigation('/');
    }
    
    return (
        <div className='Error404'>
            <h1>There is nothing here, look somewhere else</h1>
            <button onClick={redirectToRoot}>Return to Home</button>
        </div>
    )
}

export default Error404;