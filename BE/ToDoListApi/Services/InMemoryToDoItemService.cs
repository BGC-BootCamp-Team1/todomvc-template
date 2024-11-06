using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using ToDoListApi.Models;

namespace ToDoListApi.Services
{
    public class InMemoryToDoItemService : IToDoItemService
    {
        private static readonly List<ToDoItemDto> _toDoItemDtos = new List<ToDoItemDto>();



        public Task CreateAsync(ToDoItemDto toDoItemDto)
        {
            _toDoItemDtos.Add(toDoItemDto);
            return Task.CompletedTask;  
        }

        public Task<bool> DeleteAsync(string id)
        {
            var itemToRemove = _toDoItemDtos.Find(x => x.Id == id);
            if (itemToRemove != null)
            {
                _toDoItemDtos.Remove(itemToRemove);
                return Task.FromResult(true);
            }
            else
            {
                return Task.FromResult(false);
            }
            
        }

        public Task<List<ToDoItemDto>> GetAllAsync()
        {
            return Task.FromResult(_toDoItemDtos);
        }

        public Task<ToDoItemDto?> GetByIdAsync(string Id)
        {
            return Task.FromResult( _toDoItemDtos.Find(x => x.Id == Id));
        }

        public Task ReplaceAsync(ToDoItemDto toDoItemDto)
        {
            var todoIndex = _toDoItemDtos.FindIndex(x => x.Id == toDoItemDto.Id);
            if (todoIndex >= 0)
            {
                toDoItemDto.CreatedTime = _toDoItemDtos[todoIndex].CreatedTime;
                _toDoItemDtos[todoIndex] = toDoItemDto;
            }
            return Task.CompletedTask;
        }

      
    }
}
