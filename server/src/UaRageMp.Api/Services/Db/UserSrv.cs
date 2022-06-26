using Microsoft.Extensions.Options;
using MongoDB.Driver;
using UaRageMp.Api.Models.Db;
using UaRageMp.Api.Models.User;

namespace UaRageMp.Api.Services.Db
{
    public class UserSrv : BaseDbSrv<GtaUser>
    {
        public UserSrv(IOptions<DbSettings> bookStoreDatabaseSettings) : base(bookStoreDatabaseSettings)
        {
        }

        public async Task<GtaUser> Get(string login) =>
            await _collection.Find(x => x.Login == login).FirstOrDefaultAsync();
    }
}
