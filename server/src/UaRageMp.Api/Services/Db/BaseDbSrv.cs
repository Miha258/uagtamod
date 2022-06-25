using Microsoft.Extensions.Options;
using MongoDB.Driver;
using UaRageMp.Api.Models.Db;

namespace UaRageMp.Api.Services.Db
{
    public class BaseDbSrv<T> where T : class
    {
        private readonly IMongoCollection<T> _collection;

        public BaseDbSrv(
            IOptions<DbSettings> bookStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(bookStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(bookStoreDatabaseSettings.Value.DatabaseName);


            _collection = mongoDatabase.GetCollection<T>(typeof(T).Name);
        }

        public async Task<List<T>> GetAsync() =>
            await _collection.Find(_ => true).ToListAsync();

        //public async Task<T> GetAsync(string id) =>
        //    await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(T model) =>
            await _collection.InsertOneAsync(model);

        //public async Task UpdateAsync(string id, T newModel) =>
        //    await _collection.ReplaceOneAsync(x => x.Id == id, newModel);

        //public async Task RemoveAsync(string id) =>
        //    await _collection.DeleteOneAsync(x => x.Id == id);
    }
}