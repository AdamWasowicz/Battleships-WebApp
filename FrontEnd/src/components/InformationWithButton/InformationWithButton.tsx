import React from 'react';

//Style
import './style.scss';


const InformationWithButton: React.FunctionComponent<{
    onClick: () => void, 
    text: string,
    buttonText: string}> = ({onClick, text, buttonText}) => {    
    return (
        <div className='InformationWithButton'>
            <h1>{text}</h1>
            <button onClick={onClick}>{buttonText}</button>
        </div>
    )
}

export default InformationWithButton;