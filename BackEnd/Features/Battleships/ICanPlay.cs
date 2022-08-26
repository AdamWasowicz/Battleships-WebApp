using Battleships.Types;

namespace Battleships.Interfaces
{
    public interface ICanPlay
    {
        string GetPlayerName();
        GridCoordinates MakeMove(ShotsMade shotsTaken, List<Ship> playerShips);
        ICanPlay ReturnCopy();
    }
}
