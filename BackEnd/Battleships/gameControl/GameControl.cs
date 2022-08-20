using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Battleships.shared;
using Battleships.ship;
using Battleships.Models;
using BackEnd.Exceptions;


namespace Battleships.gameControl
{
    public enum Direction
    {
        LEFT,
        TOP,
        RIGHT,
        BOTTOM
    }

    public class GameControl
    {
        //Players
        private ICanPlay _player1;
        private ICanPlay _player2;

        //Game State
        private List<List<Tuple<GridCoordinates, Ship>>> _gridsWithShips;                               //<Place, Ship>[index of tuple][player1 grids, player2 grids]
        private List<List<Tuple<GridCoordinates, bool>>>  _shotsMade;                                   //<Place, did something got hit?>[plater1 shot, player2 shot]
        private List<List<Ship>> _playerShips;                                                          //[Ship][player1 ships, player2 ships]
        private int[] _playerShipsSunk = {0, 0};                                                        //[player1's ships sunk, player2's ships sunk]
        private int _currentTurn = 0;                                                                   //Current turn

        //Other
        private const int _maxAmountRandomShipPlacementTries = 20;                                      //How many tries before brute force searchnig method 
        private int _amountOfShipsOnOneSide = ShipDetails.ReturnAllAsArray().Length;                    //Number of ships for each player
        private int _maxTurns;                                                                          //After _maxTurns exceded game will finish
        private SimulateBattleshipsOutputDTO _simulationResult = new SimulateBattleshipsOutputDTO();


        //GET
        public int CurrentTurn
        {
            get { return _currentTurn; }
        }

        public ICanPlay Player1
        {
            get { return _player1.ReturnCopy(); }
        }

        public ICanPlay Player2
        {
            get { return _player2.ReturnCopy(); }
        }

        public int Player1ShipsSunkAmount
        {
            get { return _playerShipsSunk[0]; }
        }

        public int Player2ShipsSunkAmount
        {
            get { return _playerShipsSunk[1]; }
        }

        public List<Tuple<GridCoordinates, Ship>> Player1GridsWithShipCopy
        {
            get { return PlayerGridsWithShipCopy(0); }
        }

        public List<Tuple<GridCoordinates, Ship>> Player2GridsWithShipCopy
        {
            get { return PlayerGridsWithShipCopy(1); }
        }

        public List<Tuple<GridCoordinates, bool>> Player1ShotsMadeCopy
        {
            get { return PlayerShotsMadeCopy(0); }
        }

        public List<Tuple<GridCoordinates, bool>> Player2ShotsMadeCopy
        {
            get { return PlayerShotsMadeCopy(1); }
        }

        public List<Ship> Player1ShipsCopy
        {
            get { return PlayerShipsCopy(0); }
        }

        public List<Ship> Player2ShipsCopy
        {
            get { return PlayerShipsCopy(1); }
        }



        //Copy methods
        private List<Tuple<GridCoordinates, Ship>> PlayerGridsWithShipCopy(int playerIndex)
        {
            List<Tuple<GridCoordinates, Ship>> copy = new List<Tuple<GridCoordinates, Ship>>(_gridsWithShips[playerIndex].Count);
            foreach (var tuple in _gridsWithShips[playerIndex])
                copy.Add(new Tuple<GridCoordinates, Ship>(new GridCoordinates(tuple.Item1), new Ship(tuple.Item2)));

            return copy;
        }

        private List<Tuple<GridCoordinates, bool>> PlayerShotsMadeCopy(int playerIndex)
        {
            List<Tuple<GridCoordinates, bool>> copy = new List<Tuple<GridCoordinates, bool>>(_shotsMade[playerIndex].Count);
            foreach (var tuple in _shotsMade[playerIndex])
                copy.Add(new Tuple<GridCoordinates, bool>(new GridCoordinates(tuple.Item1), tuple.Item2));

            return copy;
        }

        private List<Ship> PlayerShipsCopy(int playerIndex)
        {
            List<Ship> copy = new List<Ship>(_playerShips.Count);
            foreach (var ship in _playerShips[playerIndex])
                copy.Add(new Ship(ship));

            return copy;
        }



        //Private methods
        private void NextTurnAuto()
        {
            //Select Player
            int playerIndex = _currentTurn % 2;
            int enemyIndex = (_currentTurn + 1) % 2;
            bool isHit = false;
            string playerName = "";
            GridCoordinates shotCoordinates = new GridCoordinates();


            if (playerIndex == 0)
            {
                shotCoordinates = _player1.MakeMove(Player1ShotsMadeCopy, Player1ShipsCopy);
                playerName = _player1.GetPlayerName();
            }
            else
            {
                shotCoordinates = _player2.MakeMove(Player2ShotsMadeCopy, Player2ShipsCopy);
                playerName = _player2.GetPlayerName();
            }


            for (int i = 0; i < _gridsWithShips[playerIndex].Count; i++)
            {
                //Hit
                if (shotCoordinates.GetCombinedCoordinatesAsString() == _gridsWithShips[enemyIndex][i].Item1.GetCombinedCoordinatesAsString())
                {
                    isHit = _gridsWithShips[enemyIndex][i].Item2.TryHitShip(shotCoordinates);

                    if (_gridsWithShips[enemyIndex][i].Item2.IsSunk())
                        _playerShipsSunk[enemyIndex]++;

                    _shotsMade[playerIndex].Add(new Tuple<GridCoordinates, bool>(shotCoordinates, true));
                }
            }

            //Miss
            if (!isHit)
            {
                _shotsMade[playerIndex].Add(new Tuple<GridCoordinates, bool>(shotCoordinates, false));
            }
        }

        private void EndGameByTimeOut()
        {
            if (_playerShipsSunk[0] < _playerShipsSunk[1])
                _simulationResult.endMsg =  $"Player {_player1.GetPlayerName()} Won by having more ships";
            else if (_playerShipsSunk[0] > _playerShipsSunk[1])
                _simulationResult.endMsg = $"Player {_player2.GetPlayerName()} Won by having more ships";
            else
                _simulationResult.endMsg = $"TIE";
        }

        private void EndGameByWin()
        {
            if (_playerShipsSunk[0] < _amountOfShipsOnOneSide)
                _simulationResult.endMsg = $"Player {_player1.GetPlayerName()} Won";
            else
                _simulationResult.endMsg = $"Player {_player2.GetPlayerName()} Won";
        }


        //Places each ship for each player
        public void PlaceShipsMain()
        {
            Tuple<string, int>[] shipDetails = ShipDetails.ReturnAllAsArray();

            for (int i = 0; i < 2; i++)
            {
                for (int d = 0; d < shipDetails.Length; d++)
                {
                    List<GridCoordinates> takenGrids = new List<GridCoordinates>();
                    foreach (var coord in _gridsWithShips[i])
                        takenGrids.Add(coord.Item1);

                    PlaceShipRandomlyForPlayer(shipDetails[d].Item2, takenGrids, shipDetails[d].Item1, i);
                }
            }
        }

        //Gets free grids from VerifyFreeGrids then adds them to _gridsWithShips with new Ship
        private void PlaceShipRandomlyForPlayer(int size, List<GridCoordinates> takenGrids, string shipName, int playerIndex)
        {
            const int maxCoordinateOffset = 10;
            bool placeFound = false;
            Tuple<bool, GridCoordinates[]> verificationResultTuple = new Tuple<bool, GridCoordinates[]>(false, new GridCoordinates[] {});


            for (int i = 0; i < _maxAmountRandomShipPlacementTries && !placeFound; i++)
            {
                int xOffset = new Random().Next(0, maxCoordinateOffset + 1);
                int yOffset = new Random().Next(1, maxCoordinateOffset + 1);

                char xCoord = Convert.ToChar(Convert.ToInt32('A') + xOffset);
                int yCoord = yOffset;

                if (!GridCoordinates.ValidateParams(xCoord, yCoord))
                    continue;

                GridCoordinates selectedCoordinates = new GridCoordinates(xCoord, yCoord);


                //First try should use random direction
                int firstRandomDirection = new Random().Next(0, 4);
                verificationResultTuple = VerifyFreeGridsAndReturnThem(takenGrids, selectedCoordinates, size, (Direction)firstRandomDirection);

                //If Random direction did not fint valid place then search in every direction
                for (int d = 0; d < 4 && !verificationResultTuple.Item1; d++)
                    verificationResultTuple = VerifyFreeGridsAndReturnThem(takenGrids, selectedCoordinates, size, (Direction)d);
                
                //If place found then set flag to true
                if (verificationResultTuple.Item1 == true)
                    placeFound = true;
            }

            if (!placeFound)
            {
                //Brute force method
            }

            //Add ships to _playerShip
            Ship newShip = new Ship(shipName, verificationResultTuple.Item2);
            _playerShips[playerIndex].Add(newShip);

            //Add new record to _gridsWithShip
            foreach (var coord in verificationResultTuple.Item2)
                _gridsWithShips[playerIndex].Add(new Tuple<GridCoordinates, Ship>(coord, newShip));
        }

        //Verify if coordiantes are free
        private Tuple<bool, GridCoordinates[]> VerifyFreeGridsAndReturnThem(List<GridCoordinates> takenGrids, GridCoordinates coordinates, int size, Direction direction)
        {
            GridCoordinates[] newTakenGridCoordinates = new GridCoordinates[size];
            int xOffsetValue = 0;
            int yOffsetValue = 0;


            if (direction == Direction.LEFT)
                xOffsetValue = -1;
            else if (direction == Direction.TOP)
                yOffsetValue = -1;
            else if (direction == Direction.RIGHT)
                xOffsetValue = 1;
            else                                    //Direction.BOTTOM
                yOffsetValue = -1;


            for (int i = 0; i < size; i++)
            {
                char xCoord = Convert.ToChar(Convert.ToInt32(coordinates.X) + xOffsetValue * i);
                int yCoord = Convert.ToInt32(coordinates.Y) + yOffsetValue * i;

                //Check if cordinates didn't go out of bounds
                //If taken then return false and GridCoordinates[]
                if (xCoord < 'A' || yCoord <= 0 || xCoord > 'J' || yCoord >= 11)
                    return new Tuple<bool, GridCoordinates[]>(false, newTakenGridCoordinates);

                //Check if grids overlap
                foreach (var takenGrid in takenGrids)
                {
                    //Check if Coordinate is taken
                    //If taken then return false and GridCoordinates[]
                    if (takenGrid.GetCombinedCoordinatesAsString() == new GridCoordinates(xCoord, yCoord).GetCombinedCoordinatesAsString())
                        return new Tuple<bool, GridCoordinates[]>(false, newTakenGridCoordinates);                                    
                }

                //Add new valid Coordinates
                newTakenGridCoordinates[i] = new GridCoordinates(xCoord, yCoord);
            }


            return new Tuple<bool, GridCoordinates[]>(true, newTakenGridCoordinates); ;
        }




        //Public methods
        public SimulateBattleshipsOutputDTO StartFullGame()
        {
            //simulationResult
            _simulationResult.player1Name = Player1.GetPlayerName();
            _simulationResult.player2Name = Player2.GetPlayerName();
            _simulationResult.maxTurns = _maxTurns;

            PlaceShipsMain();

            //simulationResult
            _simulationResult.player1Ships = Player1ShipsCopy;
            _simulationResult.player2Ships = Player2ShipsCopy;


            while (_currentTurn <= _maxTurns
                && _playerShipsSunk[0] < _amountOfShipsOnOneSide
                && _playerShipsSunk[1] < _amountOfShipsOnOneSide)
            {
                NextTurnAuto();
                _currentTurn++;
            }


            //simulationResult
            _simulationResult.player1ShotsMade = Player1ShotsMadeCopy;
            _simulationResult.player2ShotsMade = Player2ShotsMadeCopy;
            _simulationResult.turnsAtEnd = _currentTurn;
            

            if (_playerShipsSunk[0] == _amountOfShipsOnOneSide || _playerShipsSunk[1] == _amountOfShipsOnOneSide)
                EndGameByWin();

            if (_currentTurn > _maxTurns)
                EndGameByTimeOut();

            return _simulationResult;
        }



        public GameControl(ICanPlay player1, ICanPlay player2, int maxTurns = 150)
        {
            _player1 = player1;
            _player2 = player2;

            if (maxTurns <= 0)
                throw new InvalidMaxTurnsArgumentException();

            _maxTurns = maxTurns;


            _shotsMade = new List<List<Tuple<GridCoordinates, bool>>>(2)
            {
                new List<Tuple<GridCoordinates, bool>>(maxTurns),
                new List<Tuple<GridCoordinates, bool>>(maxTurns)
            };
            _playerShips = new List<List<Ship>>(2)
            {
                new List<Ship>(5),
                new List<Ship>(5)
            };
            _gridsWithShips = new List<List<Tuple<GridCoordinates, Ship>>>(2) 
            { 
                new List<Tuple<GridCoordinates, Ship>>(17),
                new List<Tuple<GridCoordinates, Ship>>(17),
            };
        }
    }
}
