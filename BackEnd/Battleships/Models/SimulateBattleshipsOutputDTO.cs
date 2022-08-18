using Battleships.shared;
using Battleships.ship;

namespace Battleships.Models
{
    public class SimulateBattleshipsOutputDTO 
    {
        public string endMsg { get; set; }


        public string player1Name { get; set; }
        public string player2Name { get; set; }
        public int maxTurns { get; set; }
        public int turns { get; set; }


        //Setup
        public List<Ship> player1Ships { get; set; }
        public List<Ship> player2Ships { get; set; }


        //Results
        public List<Tuple<GridCoordinates, bool>> player1ShotsMade { get; set; }
        public List<Tuple<GridCoordinates, bool>> player2ShotsMade { get; set; }
    }
}
