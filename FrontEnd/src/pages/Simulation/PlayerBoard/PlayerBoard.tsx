import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../../redux/hooks';
import IShip from '../assets/IShip';

//Style
import './style.scss';


const PlayerBoard: React.FunctionComponent<{playerId: number}> = ( { playerId } ) => {

    const CreatePlayerShipsMap = (): Map<string, IShip> => {

        let shipsMap = new Map<string, IShip>();
            playerShips.forEach((ship: IShip) => {
            ship.gridCoordinates.forEach((gc) => {
                shipsMap.set(gc.x + gc.y, ship);
            })
        });

        return shipsMap;
    }

    const eleven: number[] = [0,1,2,3,4,5,6,7,8,9,10];
    
    const playerShips = playerId == 0 
    ? useAppSelector(state => state.battleships.player1Ships)
    : useAppSelector(state => state.battleships.player2Ships);

    const playerBoardState = playerId == 0
    ? useAppSelector(state => state.battleships.player1BoardState)
    : useAppSelector(state => state.battleships.player2BoardState);

    let shipsMap = useMemo(() => {
        return CreatePlayerShipsMap()
    }, [])

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
                            isHit={false}
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

        if (ship != null && isHit == true) {
            return `[${ship.className[0]}]`
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
        <div className={`Grid ${cn} ${corner ? 'GridCorner' : 'a'}`}>
            {text}
        </div>
    )
}

export default PlayerBoard;