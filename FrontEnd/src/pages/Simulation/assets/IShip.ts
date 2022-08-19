import GridCoordinates from "./GridCoordinates";

export default interface IShip {

    size: number;
    damagedGrids: number;
    className: string;
    partsHit: Array<boolean>;
    gridCoordinates: Array<GridCoordinates>
}