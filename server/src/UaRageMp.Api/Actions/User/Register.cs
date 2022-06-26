using Mapster;
using MediatR;
using UaRageMp.Api.Models.User;
using UaRageMp.Api.Models.Vms;
using UaRageMp.Api.Services.Db;
using BCryptNet = BCrypt.Net.BCrypt;

namespace UaRageMp.Api.Actions.User
{
    public class Register
    {
        public class Request : IRequest<BaseResponse<Response>>
        {
            public string Login { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
            public string SecretInfo { get; set; }
        }

        public class Response
        {
            public bool Success { get; set; }
        }

        public class Handler : IRequestHandler<Request, BaseResponse<Response>>
        {
            private readonly UserSrv _userSrv;

            public Handler(UserSrv userSrv)
            {
                _userSrv = userSrv;
            }

            public async Task<BaseResponse<Response>> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await _userSrv.Get(request.Login);

                if (user != null)
                    return new BaseResponse<Response>("Поданий логін вже існує");

                try
                {
                    var newUser = request.Adapt<GtaUser>();
                    newUser.PasswordHash = BCryptNet.HashPassword(request.Password);

                    await _userSrv.CreateAsync(newUser);

                    return new BaseResponse<Response>
                    {
                        Data = new Response { Success = true }
                    };
                }
                catch
                {
                    return new BaseResponse<Response>("Неможливо створити аккаунт");
                }
            }

            private static bool ValidatePassword(GtaUser user, string password)
            {
                if (user == null || !BCryptNet.Verify(password, user.PasswordHash))
                    return false;

                return true;
            }
        }
    }
}
