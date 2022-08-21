import { useAppSelector } from "../../../../redux/hooks";
import IShip from "../../assets/IShip";



export const usePlayerBoard = (playerId: number) => {

    //Maping functions
    const CreatePlayerShipsMap = (playerShips: IShip[]): Map<string, IShip> => {

        let shipsMap = new Map<string, IShip>();

        playerShips.forEach((ship: IShip) => {
            ship.gridCoordinates.forEach((gc) => {
                shipsMap.set(gc.x + gc.y, ship);
            })
        });

        return shipsMap;
    }

    const CreateShotsMap = (shotsCoordiantes: string[]): Map<string, boolean> => {

        let shotsMap = new Map<string, boolean>();

        shotsCoordiantes.forEach((gc: string) => {
            shotsMap.set(gc, true);
        });

        return shotsMap;
    }


    //Consts
    const eleven: number[] = [0,1,2,3,4,5,6,7,8,9,10];
    
    const playerShips = playerId == 0 
    ? useAppSelector(state => state.battleships.player1Ships)
    : useAppSelector(state => state.battleships.player2Ships);

    const playerBoardState = playerId == 0
    ? useAppSelector(state => state.battleships.player1BoardState)
    : useAppSelector(state => state.battleships.player2BoardState);

    //Maps
    let shipsMap = CreatePlayerShipsMap(playerShips);
    let shotsMap = CreateShotsMap(playerBoardState);

    
    return { shotsMap, shipsMap, eleven }
}