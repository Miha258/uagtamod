using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations.Schema;

namespace UaRageMp.Api.Models.User
{
    [Table("users")]
    [BsonIgnoreExtraElements]
    public class GtaUser
    {
        public string Email { get; set; }
        public string Login { get; set; }
        public string Salt { get; set; }
        public string Hash { get; set; }
        public DateTime? BannedTime { get; set; }
        public bool IsBanned { get; set; }
    }
}
