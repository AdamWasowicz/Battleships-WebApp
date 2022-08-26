using BackEnd.Models;

namespace BackEnd.Interfaces
{
    public interface IBattleshipsService
    {
        SimulateBattleshipsOutputDTO SimulateBattleshipsGame(SimulateBattleshipsInputDTO dto);
    }
}
