using Microsoft.Extensions.Options;
using UaRageMp.Api.Models.Db;
using UaRageMp.Api.Models.User;

namespace UaRageMp.Api.Services.Db
{
    public class UserSrv : BaseDbSrv<GtaUser>
    {
        public UserSrv(IOptions<DbSettings> bookStoreDatabaseSettings) : base(bookStoreDatabaseSettings)
        {
        }
    }
}
