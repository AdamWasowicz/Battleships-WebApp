using Battleships.shared;
using Battleships.ship;

namespace Battleships.Models
{
    public class SimulateBattleshipsInputDTO
    {
        public string player1Name { get; set; }
        public string player2Name { get; set; }
        public int maxTurns { get; set; }
    }
}
