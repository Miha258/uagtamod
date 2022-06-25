using Microsoft.AspNetCore.Mvc;
using UaRageMp.Api.Models.User;
using UaRageMp.Api.Services.Db;

namespace UaRageMp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserSrv _userSrv;

        public UserController(
            ILogger<UserController> logger,
            UserSrv userSrv)
        {
            _logger = logger;
            _userSrv = userSrv;
        }

        [HttpGet]
        public async Task<List<GtaUser>> Get() =>
            await _userSrv.GetAsync();

        [HttpPost]
        public async Task<IActionResult> Post(GtaUser newBook)
        {
            await _userSrv.CreateAsync(newBook);

            return CreatedAtAction(nameof(Get), new { id = newBook.Login }, newBook);
        }

    }
}