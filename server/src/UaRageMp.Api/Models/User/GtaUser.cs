using MongoDB.Bson.Serialization.Attributes;

namespace UaRageMp.Api.Models.User
{
    [BsonIgnoreExtraElements]
    public class GtaUser
    {
        public string Email { get; set; }
        public string Login { get; set; }
        public string SecretInfo { get; set; }
        public string PasswordHash { get; set; }
        public DateTime? BannedTime { get; set; }
        public bool IsBanned { get; set; }
        public IEnumerable<Roles> Roles {get;set; }
    }
}
