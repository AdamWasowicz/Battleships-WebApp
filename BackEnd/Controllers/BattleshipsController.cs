using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BackEnd.Models;
using BackEnd.Interfaces;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/v1/battleships")]
    public class BattleshipsController : ControllerBase
    {
        private readonly IBattleshipsService _battleshipsService;


        public BattleshipsController(IBattleshipsService battleshipsService)
        {
            _battleshipsService = battleshipsService;
        }


        [HttpPost("simulation")]
        [AllowAnonymous]
        public ActionResult<SimulateBattleshipsOutputDTO> SimulateBattleshipsGame([FromBody] SimulateBattleshipsInputDTO dto)
        {
            return _battleshipsService.SimulateBattleshipsGame(dto);
        }
    }
}
