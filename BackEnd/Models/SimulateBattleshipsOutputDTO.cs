using Battleships.Types;
using Battleships;

namespace BackEnd.Models
{
    public class SimulateBattleshipsOutputDTO 
    {
        public string endMsg { get; set; }


        public string player1Name { get; set; }
        public string player2Name { get; set; }
        public int maxTurns { get; set; }
        public int turnsAtEnd { get; set; }


        //Setup
        public List<Ship> player1Ships { get; set; }
        public List<Ship> player2Ships { get; set; }


        //Results
        public ShotsMade player1ShotsMade { get; set; }
        public ShotsMade player2ShotsMade { get; set; }
    }
}
