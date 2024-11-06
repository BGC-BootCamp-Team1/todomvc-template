using ToDoListApi.Models;

namespace ToDoListApi.Services
{
    public interface IToDoItemService
    {
        Task CreateAsync(ToDoItemDto toDoItem);
        Task<bool> DeleteAsync(string id);
        Task<List<ToDoItemDto>> GetAllAsync();
        Task<ToDoItemDto?> GetByIdAsync(string Id);
        Task ReplaceAsync(ToDoItemDto toDoItem);
    }
}