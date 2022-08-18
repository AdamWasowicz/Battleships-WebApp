import Tuple from "../../../assets/classes/Tuple";
import GridCoordinates from "./GridCoordinates";
import IShip from "./IShip";

export default interface ISimulateBattleshipsOutputDTO {

    endMsg: string;

    player1Name: string;
    player2Name: string;
    maxTurns: number;
    turnsAtEnd: number;

    player1Ships: Array<IShip>;
    player2Ships: Array<IShip>;

    player1ShotsMade: Array<Tuple<GridCoordinates, boolean>>
    player2ShotsMade: Array<Tuple<GridCoordinates, boolean>>
}