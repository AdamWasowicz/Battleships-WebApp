import GridCoordinates from "./GridCoordinates";

export default interface IShip {

    _size: number;
    _damagedGrids: number;
    _className: string;
    _partsHit: Array<boolean>;
    _gridCoordinates: Array<GridCoordinates>
}