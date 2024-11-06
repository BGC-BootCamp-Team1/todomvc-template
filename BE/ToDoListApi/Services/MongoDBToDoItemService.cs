using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ToDoListApi.Controllers;
using ToDoListApi.Models;

namespace ToDoListApi.Services
{
    public class MongoDBToDoItemService : IToDoItemService
    {
        private readonly IMongoCollection<ToDoItem> _ToDoItemsCollection;
        private readonly ILogger<IToDoItemService> _logger;

        public MongoDBToDoItemService(
            IOptions<ToDoItemDatabaseSettings> ToDoItemStoreDatabaseSettings,
            ILogger<IToDoItemService> logger)
        {
            var mongoClient = new MongoClient(
                ToDoItemStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                ToDoItemStoreDatabaseSettings.Value.DatabaseName);

            _ToDoItemsCollection = mongoDatabase.GetCollection<ToDoItem>(
                ToDoItemStoreDatabaseSettings.Value.CollectionName);
            _logger = logger;
        }

        public async Task<List<ToDoItemDto>> GetAllAsync()
        {
            var toDoItems = await _ToDoItemsCollection.Find(_ => true).ToListAsync();
            if (toDoItems == null) {
                return new List<ToDoItemDto>();
            }
            else
            {
                List<ToDoItemDto> toDoItemDtos = toDoItems.Select(x => new ToDoItemDto
                {
                    Id = x.Id,
                    Description = x.Description,
                    Done = x.Done,
                    Favorite = x.Favorite,
                    CreatedTime = x.CreatedTime,
                }).ToList();
                return toDoItemDtos;
            }
        }

        public async Task<ToDoItemDto?> GetByIdAsync(string id)
        {
            var toDoItem = await _ToDoItemsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            if (toDoItem is null)
            {
                return null;
            }
            else
            {
                return new ToDoItemDto
                {
                    Id = toDoItem.Id,
                    Description = toDoItem.Description,
                    Done = toDoItem.Done,
                    Favorite = toDoItem.Favorite,
                    CreatedTime = toDoItem.CreatedTime,
                };
            }
        }

        public async Task CreateAsync(ToDoItemDto toDoItemDto)
        {
            await _ToDoItemsCollection.InsertOneAsync(new ToDoItem
            {
                Id = toDoItemDto.Id,
                Description = toDoItemDto.Description,
                Done = toDoItemDto.Done,
                Favorite = toDoItemDto.Favorite,
                CreatedTime = toDoItemDto.CreatedTime,
            });
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _ToDoItemsCollection.DeleteOneAsync(x => x.Id == id);
            return (result.DeletedCount >= 1);
        }

        public async Task ReplaceAsync(ToDoItemDto toDoItemDto)
        {
            await _ToDoItemsCollection.ReplaceOneAsync(x => x.Id == toDoItemDto.Id, new ToDoItem
            {
                Id = toDoItemDto.Id,
                Description = toDoItemDto.Description,
                Done = toDoItemDto.Done,
                Favorite = toDoItemDto.Favorite,
                CreatedTime = toDoItemDto.CreatedTime,
            });
        }
    }
}
