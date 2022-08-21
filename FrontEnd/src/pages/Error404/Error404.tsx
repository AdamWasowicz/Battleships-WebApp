import React from 'react';
import { useNavigate } from 'react-router';
import InformationWithButton from '../../components/InformationWithButton';


const Error404: React.FunctionComponent = () => {

    const navigation = useNavigate();
    const redirectToRoot = () => {
        navigation('/');
    }
    
    return (
        <InformationWithButton
            onClick={redirectToRoot}
            text='There is nothing here, go to home page'
            buttonText='Return to Home'
        />
    )
}

export default Error404;