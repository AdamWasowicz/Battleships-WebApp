using BackEnd.Interfaces;
using BackEnd.Models;
using Battleships;

namespace BackEnd.Services;

public class BattleshipsService : IBattleshipsService 
{
    public SimulateBattleshipsOutputDTO SimulateBattleshipsGame(SimulateBattleshipsInputDTO dto)
    {
        BattleshipsBot bot1 = new BattleshipsBot(dto.player1Name);
        BattleshipsBot bot2 = new BattleshipsBot(dto.player2Name);

        GameControl gameControl = new GameControl(bot1, bot2, dto.maxTurns);
        var result = gameControl.StartFullGame();

        return result;
    }
}
