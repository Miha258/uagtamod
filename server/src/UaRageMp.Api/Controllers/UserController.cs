using MediatR;
using Microsoft.AspNetCore.Mvc;
using UaRageMp.Api.Actions.User;
using UaRageMp.Api.Models.User;
using UaRageMp.Api.Models.Vms;
using UaRageMp.Api.Services.Db;

namespace UaRageMp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserSrv _userSrv;
        private readonly IMediator _mediator;

        public UserController(
            ILogger<UserController> logger,
            UserSrv userSrv,
            IMediator mediator)
        {
            _logger = logger;
            _userSrv = userSrv;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<List<GtaUser>> Get() =>
            await _userSrv.GetAsync();

        [HttpPost("Register")]
        public async Task<BaseResponse<Register.Response>> Register(Register.Request request)
        {
            var response = await _mediator.Send(request);

            return response;
        }

        [HttpPost("Login")]
        public async Task<BaseResponse<Login.Response>> Login(Login.Request request)
        {
            var response = await _mediator.Send(request);

            return response;
        }

    }
}