using ToDoListApi.Models;
using ToDoListApi.Services;

namespace ToDoListApi.UnitTests.Services
{
    public class InMemoryToDoItemService : IToDoItemService
    {
        private readonly List<ToDoItemDto> _toDoItems = new();

        public InMemoryToDoItemService()
        {
            //Thread.Sleep(5000);
        }
        public Task CreateAsync(ToDoItemDto newToDoItem)
        {
            _toDoItems.Add(newToDoItem);
            return Task.CompletedTask;
        }


        public Task<ToDoItemDto?> GetByIdAsync(string id)
        {
            var toDoItem = _toDoItems.Find(x => x.Id == id);
            return Task.FromResult(toDoItem);

        }


        public Task<bool> DeleteAsync(string id)
        {
            var itemToBeRemoved = _toDoItems.Find(x => x.Id == id);
            if (itemToBeRemoved is null)
            {
                return Task.FromResult(false);
            }
            _toDoItems.Remove(itemToBeRemoved);
            return Task.FromResult(true);
        }



        public Task ReplaceAsync(ToDoItemDto updatedToDoItem)
        {
            var index = _toDoItems.FindIndex(x => x.Id == updatedToDoItem.Id);
            if (index >= 0)
            {
                updatedToDoItem.CreatedTime = _toDoItems[index].CreatedTime;
                _toDoItems[index] = updatedToDoItem;
            }
            return Task.CompletedTask;
        }

        public void AddToDoItem(ToDoItemDto toDoItem)
        {
            _toDoItems.Add(toDoItem);
        }

        public Task<List<ToDoItemDto>> GetAllAsync()
        {
            return Task.FromResult(_toDoItems);
        }

    }
}
