using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Battleships;
using Battleships.Models;


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


        [HttpPost]
        [AllowAnonymous]
        public ActionResult<SimulateBattleshipsOutputDTO> SimulateBattleshipsGame([FromBody] SimulateBattleshipsInputDTO dto)
        {
            return _battleshipsService.SimulateBattleshipsGame(dto);
        }
    }
}
