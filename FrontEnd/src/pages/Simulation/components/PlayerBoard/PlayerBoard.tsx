import React from 'react';
import IShip from '../../assets/IShip';

import { usePlayerBoard } from './utils';

//Style
import './style.scss';


const PlayerBoard: React.FunctionComponent<{playerId: number}> = ( { playerId } ) => {

    const {shipsMap, eleven, shotsMap } = usePlayerBoard(playerId);

    return (
        <div className='PlayerBoard'>
            {
                eleven.map((arg1) => {
                    return eleven.map((arg2) => {
                        return <Grid 
                            X={arg1.toLocaleString()} 
                            Y={arg2.toLocaleString()} 
                            ship={
                                shipsMap.get(
                                    String.fromCharCode(arg1 + +'A'.charCodeAt(0) - 1) + (arg2).toLocaleString()
                                )
                            } 
                            isHit={
                                shotsMap.get(
                                    String.fromCharCode(arg1 + +'A'.charCodeAt(0) - 1) + (arg2).toLocaleString()
                                )
                            }
                            key={arg1+arg2*10}
                        />
                    })
                })
            }
        </div>
    )
}

const Grid: React.FunctionComponent<{X: string, Y:string, ship: IShip, isHit: boolean}> = ({X, Y, ship, isHit}) => {

    const renderText = (): string => {

        if (X == '0' && Y == '0') {
            corner = true;
            return ' ';
        }

        if (X == '0') {
            corner = true;
            return Y;
        }

        if (Y == '0') {
            corner = true;
            return String.fromCharCode(+X + +'A'.charCodeAt(0) -1);
        }

        if (ship == null && isHit == true) {
            return 'X';
        }

        if (ship != null) {
            return ship.className[0];
        }

        return '?';
    }

    let corner: boolean = false;
    const text = renderText();
    const cn = ship != null ? ship.className[0] : '';

    return(
        <div className={
            `Grid 
            ${cn} 
            ${corner ? 'GridCorner' : ''} 
            ${isHit ? 'isHit' : ''}
            ${ship != null ? 'Ship' : ''}`}>

                {text}
        </div>
    )
}

export default PlayerBoard;