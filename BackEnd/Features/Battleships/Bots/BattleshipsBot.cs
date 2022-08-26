using System;
using Battleships.Types;
using Battleships.Interfaces;

namespace Battleships
{
    public class BattleshipsBot : ICanPlay
    {
        private string _botName;
        private const int _maxTriesNumber = 10;
        const int maxCoordinateOffset = 10;


        //Private methods
        private GridCoordinates MakeRandomMove(ShotsMade shotsTaken)
        {
            int xOffset = new Random().Next(0, maxCoordinateOffset + 1);
            int yOffset = new Random().Next(1, maxCoordinateOffset + 1);

            char xCoord = Convert.ToChar(Convert.ToInt32('A') + xOffset);
            int yCoord = yOffset;

            GridCoordinates selectedCoordinates = new GridCoordinates(xCoord, yCoord);

            return selectedCoordinates;
        }


        //Public methods
        public ICanPlay ReturnCopy() => new BattleshipsBot(_botName);
        
        public string GetPlayerName() => _botName.ToString();
        
        public GridCoordinates MakeMove(ShotsMade shotsTaken, List<Ship> playerShips)
        {

            GridCoordinates shot = new GridCoordinates();

            for (int i = 0; i < _maxTriesNumber; i++)
            {
                bool shotAlreadyExists = false;
                shot = MakeRandomMove(shotsTaken);

                foreach (var takenShoot in shotsTaken)
                {
                    if (shot.GetCombinedCoordinatesAsString() == takenShoot.Item1.GetCombinedCoordinatesAsString())
                    {
                        shotAlreadyExists = true;
                        break;
                    }
                }

                if (shotAlreadyExists == false)
                    return shot;
            }
            
            return MakeRandomMove(shotsTaken);
        }


        public BattleshipsBot(string botName)
        {
            _botName = botName;
        }
    }
}
