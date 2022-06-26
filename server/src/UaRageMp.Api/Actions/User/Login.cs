using MediatR;
using UaRageMp.Api.Models.User;
using UaRageMp.Api.Models.Vms;
using UaRageMp.Api.Services.Db;
using BCryptNet = BCrypt.Net.BCrypt;
using Mapster;
using UaRageMp.Api.Models;

namespace UaRageMp.Api.Actions.User
{
    public class Login
    {
        public class Request : IRequest<BaseResponse<Response>>
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        public class Response
        {
            public string Email { get; set; }
            public string Login { get; set; }
            public IEnumerable<Roles> Roles { get; set; }
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
                var user = await _userSrv.Get(request.Username);

                try
                {
                    var validUser = ValidatePassword(user, request.Password);

                    if (validUser)
                    {
                        var response = user.Adapt<Response>();

                        return new BaseResponse<Response>
                        {
                            Data = response
                        };
                    }

                    return new BaseResponse<Response>("Ви ввели неправильне ім'я користувача або пароль");
                }
                catch
                {
                    return new BaseResponse<Response>("Ви ввели неправильне ім'я користувача або пароль");
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

