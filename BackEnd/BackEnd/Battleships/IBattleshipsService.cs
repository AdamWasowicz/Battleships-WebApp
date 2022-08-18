using Battleships.Models;

namespace Battleships
{
    public interface IBattleshipsService
    {
        SimulateBattleshipsOutputDTO SimulateBattleshipsGame(SimulateBattleshipsInputDTO dto);
    }
}
